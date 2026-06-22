const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const dbService = require('../services/dbService');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');

function generateAccessToken(email) {
  return jwt.sign({ email }, env.jwtAccessSecret, { expiresIn: env.accessTokenTtlSeconds });
}

function generateRefreshToken(email, rememberMe) {
  const ttl = rememberMe ? env.refreshRememberTtlSeconds : env.refreshSessionTtlSeconds;
  return jwt.sign({ email }, env.jwtRefreshSecret, { expiresIn: ttl });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePasswordStrength(password) {
  // Min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
}

const authController = {
  async signup(req, res, next) {
    try {
      const { name, email, password, confirmPassword, dob, gender } = req.body;

      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: { message: 'All fields are required.' } });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: { message: 'Invalid email format.' } });
      }

      if (!validatePasswordStrength(password)) {
        return res.status(400).json({
          error: { message: 'Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character.' }
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: { message: 'Passwords do not match.' } });
      }

      const existingUser = dbService.getUserByEmail(email);
      if (existingUser) {
        if (existingUser.status === 'verified') {
          return res.status(400).json({ error: { message: 'Email already registered.' } });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        dbService.updateUser(email, { 
          name: name.trim(), 
          passwordHash, 
          status: 'verified',
          dob: dob || null,
          gender: gender || null,
          ssoProvider: req.body.ssoProvider || null
        });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);
        dbService.createUser({ 
          name, 
          email, 
          passwordHash, 
          status: 'verified',
          dob: dob || null,
          gender: gender || null,
          ssoProvider: req.body.ssoProvider || null
        });
      }

      const createdUser = dbService.getUserByEmail(email);
      const accessToken = generateAccessToken(createdUser.email);
      const refreshToken = generateRefreshToken(createdUser.email, false);

      res.cookie(env.refreshCookieName, refreshToken, {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'Lax',
        maxAge: env.refreshSessionTtlSeconds * 1000
      });

      res.status(201).json({
        message: 'Signup successful!',
        accessToken,
        user: { name: createdUser.name, email: createdUser.email }
      });
    } catch (err) {
      next(err);
    }
  },

  async verifyOtp(req, res, next) {
    try {
      const { email, code, type } = req.body;

      if (!email || !code || !type) {
        return res.status(400).json({ error: { message: 'Email, code, and type are required.' } });
      }

      const activeOtp = dbService.getOtp(email, type);
      if (!activeOtp) {
        return res.status(400).json({ error: { message: 'No active OTP found for this request.' } });
      }

      const now = new Date();
      if (now > new Date(activeOtp.expiresAt)) {
        dbService.deleteOtp(email, type);
        return res.status(400).json({ error: { message: 'OTP has expired. Please request a new one.' } });
      }

      if (activeOtp.code !== code.trim()) {
        return res.status(400).json({ error: { message: 'Incorrect OTP code.' } });
      }

      dbService.deleteOtp(email, type);

      if (type === 'signup') {
        const user = dbService.updateUser(email, { status: 'verified' });
        
        // Issue tokens
        const accessToken = generateAccessToken(user.email);
        const refreshToken = generateRefreshToken(user.email, false);

        // Set refresh token in HTTP-only cookie
        res.cookie(env.refreshCookieName, refreshToken, {
          httpOnly: true,
          secure: env.cookieSecure,
          sameSite: 'Lax',
          maxAge: env.refreshSessionTtlSeconds * 1000
        });

        return res.json({
          message: 'Account verified successfully!',
          accessToken,
          user: { name: user.name, email: user.email }
        });
      } else if (type === 'forgot_password') {
        // For forgot password, we return a temporary verification token (JWT) to let them hit resetPassword
        const verificationToken = jwt.sign({ email, verified: true }, env.jwtAccessSecret, { expiresIn: '5m' });
        return res.json({
          message: 'OTP verified successfully.',
          verificationToken
        });
      }

      return res.status(400).json({ error: { message: 'Invalid OTP type.' } });
    } catch (err) {
      next(err);
    }
  },

  async resendOtp(req, res, next) {
    try {
      const { email, type } = req.body;

      if (!email || !type) {
        return res.status(400).json({ error: { message: 'Email and type are required.' } });
      }

      const user = dbService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: { message: 'User not found.' } });
      }

      if (type === 'signup' && user.status === 'verified') {
        return res.status(400).json({ error: { message: 'Account is already verified.' } });
      }

      // Check cooldown
      const existingOtp = dbService.getOtp(email, type);
      if (existingOtp) {
        const now = new Date();
        const cooldownDate = new Date(existingOtp.cooldownUntil);
        if (now < cooldownDate) {
          const remainingSeconds = Math.ceil((cooldownDate.getTime() - now.getTime()) / 1000);
          return res.status(429).json({
            error: { message: `Please wait ${remainingSeconds} seconds before requesting another code.` }
          });
        }
      }

      // Generate new OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + env.otpExpiresMinutes * 60 * 1000);
      const cooldownUntil = new Date(now.getTime() + env.otpCooldownSeconds * 1000);

      dbService.saveOtp(email, otpCode, expiresAt, cooldownUntil, type);

      // Send email
      await emailService.sendOtpEmail(email, otpCode, user.name);

      res.json({
        message: 'A new verification code has been sent.',
        cooldownSeconds: env.otpCooldownSeconds,
        previewUrl: env.nodeEnv === 'development' ? global.lastEmailPreviewUrl : undefined
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password, rememberMe } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: { message: 'Email and password are required.' } });
      }

      const user = dbService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: { message: 'Invalid email or password.' } });
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return res.status(401).json({ error: { message: 'Invalid email or password.' } });
      }

      if (user.status === 'unverified') {
        dbService.updateUser(email, { status: 'verified' });
      }

      // Generate tokens
      const accessToken = generateAccessToken(user.email);
      const refreshToken = generateRefreshToken(user.email, rememberMe);

      // Set cookie maxage
      const maxAge = rememberMe
        ? env.refreshRememberTtlSeconds * 1000
        : env.refreshSessionTtlSeconds * 1000;

      res.cookie(env.refreshCookieName, refreshToken, {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'Lax',
        maxAge
      });

      res.json({
        message: 'Login successful!',
        accessToken,
        user: { name: user.name, email: user.email }
      });
    } catch (err) {
      next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const cookies = req.headers.cookie;
      let token = null;

      if (cookies) {
        const list = {};
        cookies.split(';').forEach(cookie => {
          const parts = cookie.split('=');
          list[parts[0].trim()] = parts[1] ? parts[1].trim() : '';
        });
        token = list[env.refreshCookieName];
      }

      if (!token) {
        return res.status(401).json({ error: { message: 'Refresh token missing.' } });
      }

      try {
        const payload = jwt.verify(token, env.jwtRefreshSecret);
        const user = dbService.getUserByEmail(payload.email);
        if (!user) {
          return res.status(401).json({ error: { message: 'Invalid refresh token.' } });
        }

        const accessToken = generateAccessToken(user.email);
        res.json({ accessToken, user: { name: user.name, email: user.email } });
      } catch (err) {
        return res.status(401).json({ error: { message: 'Refresh token expired or invalid.' } });
      }
    } catch (err) {
      next(err);
    }
  },

  async logout(req, res, next) {
    try {
      res.clearCookie(env.refreshCookieName, {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'Lax'
      });
      res.json({ message: 'Logged out successfully.' });
    } catch (err) {
      next(err);
    }
  },

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: { message: 'Email is required.' } });
      }

      const user = dbService.getUserByEmail(email);
      
      // Generate a secure, random token (32 bytes hex)
      const token = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes

      let resetLinkVal = undefined;

      if (user) {
        // Store hashed token and expiration in the user record
        dbService.updateUser(email, {
          passwordResetToken: hashedToken,
          passwordResetExpires: expiresAt
        });
        
        // Construct reset link using request protocol and host for local dev network compatibility
        const host = req.get('host');
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        
        let devHost = host;
        if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
          try {
            const os = require('os');
            const nets = os.networkInterfaces();
            let foundIp = null;
            for (const name of Object.keys(nets)) {
              for (const net of nets[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                  foundIp = net.address;
                  break;
                }
              }
              if (foundIp) break;
            }
            if (foundIp) {
              devHost = host.replace('localhost', foundIp).replace('127.0.0.1', foundIp);
            }
          } catch (e) {
            // fallback to original host
          }
        }
        
        const resetLink = `${protocol}://${devHost}/#reset?token=${token}&email=${encodeURIComponent(email)}`;
        resetLinkVal = resetLink;

        await emailService.sendResetLinkEmail(email, resetLink, user.name);
      } else {
        // Security Note: If the email does not exist in the system, still log it but simulate a response.
        console.log(`[Security Note] Forgot password request for non-existent email: ${email}. Simulating email sent.`);
      }

      res.json({
        message: 'If an account exists with that email, a password reset link has been sent.',
        email,
        resetLink: env.nodeEnv === 'development' ? resetLinkVal : undefined,
        previewUrl: env.nodeEnv === 'development' ? global.lastEmailPreviewUrl : undefined
      });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { email, token, newPassword, confirmPassword } = req.body;

      if (!email || !token || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: { message: 'All fields are required.' } });
      }

      if (!validatePasswordStrength(newPassword)) {
        return res.status(400).json({
          error: { message: 'Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character.' }
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: { message: 'Passwords do not match.' } });
      }

      const user = dbService.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: { message: 'Invalid user account.' } });
      }

      if (!user.passwordResetToken || !user.passwordResetExpires) {
        return res.status(400).json({ error: { message: 'No active password recovery session found.' } });
      }

      const now = new Date();
      if (now > new Date(user.passwordResetExpires)) {
        dbService.updateUser(email, { passwordResetToken: null, passwordResetExpires: null });
        return res.status(400).json({ error: { message: 'Password reset link has expired.' } });
      }

      const hashedInputToken = crypto.createHash('sha256').update(token).digest('hex');
      if (user.passwordResetToken !== hashedInputToken) {
        return res.status(400).json({ error: { message: 'Invalid password reset token.' } });
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);
      
      // Update password and clear password recovery token details
      dbService.updateUser(email, {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null
      });

      res.json({
        message: 'Password has been reset successfully. Please login with your new credentials.'
      });
    } catch (err) {
      next(err);
    }
  },

  async ssoLogin(req, res, next) {
    try {
      const { email, name, provider } = req.body;

      if (!email || !provider) {
        return res.status(400).json({ error: { message: 'Email and provider are required.' } });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: { message: 'Invalid email format.' } });
      }

      let user = dbService.getUserByEmail(email);
      const isLoginFlow = (req.body.flow === 'login' || req.body.isLogin === true);
      
      if (!user) {
        if (isLoginFlow) {
          return res.status(404).json({
            error: {
              message: 'No DnD account is associated with this account.',
              code: 'UNREGISTERED_SSO'
            }
          });
        }
        // Create a new verified SSO user
        const dummyPassword = Math.random().toString(36) + Math.random().toString(36);
        const passwordHash = await bcrypt.hash(dummyPassword, 10);
        user = dbService.createUser({
          name: name ? name.trim() : email.split('@')[0],
          email: email.toLowerCase().trim(),
          passwordHash,
          status: 'verified'
        });
        // Save SSO provider info
        dbService.updateUser(email, { ssoProvider: provider });
      } else if (user.status !== 'verified') {
        // Auto-verify existing unverified profile on SSO sign in
        user = dbService.updateUser(email, { status: 'verified', ssoProvider: provider });
      }

      const accessToken = generateAccessToken(user.email);
      const refreshToken = generateRefreshToken(user.email, true);

      res.cookie(env.refreshCookieName, refreshToken, {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'Lax',
        maxAge: env.refreshRememberTtlSeconds * 1000
      });

      res.json({
        message: 'SSO Login successful!',
        accessToken,
        user: { name: user.name, email: user.email }
      });
    } catch (err) {
      next(err);
    }
  },

  async phoneSendOtp(req, res, next) {
    try {
      const { countryCode, phoneNumber } = req.body;

      if (!countryCode || !phoneNumber) {
        return res.status(400).json({ error: { message: 'Country code and phone number are required.' } });
      }

      const phone = (countryCode.trim() + phoneNumber.trim()).replace(/[\s\-()]/g, '');

      // Check cooldown
      const existingOtp = dbService.getOtp(phone, 'phone');
      if (existingOtp) {
        const now = new Date();
        const cooldownDate = new Date(existingOtp.cooldownUntil);
        if (now < cooldownDate) {
          const remainingSeconds = Math.ceil((cooldownDate.getTime() - now.getTime()) / 1000);
          return res.status(429).json({
            error: { message: `Please wait ${remainingSeconds} seconds before requesting another code.` }
          });
        }
      }

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + env.otpExpiresMinutes * 60 * 1000);
      const cooldownUntil = new Date(now.getTime() + env.otpCooldownSeconds * 1000);

      dbService.saveOtp(phone, otpCode, expiresAt, cooldownUntil, 'phone');

      const smsResult = await smsService.sendOtpSms(phone, otpCode);

      res.json({
        message: smsResult.simulated ? 'OTP sent successfully via SMS simulation.' : 'OTP sent successfully via SMS.',
        phone,
        cooldownSeconds: env.otpCooldownSeconds,
        // Expose OTP in response only in dev mode for easy autofill
        otpCode: env.nodeEnv === 'development' ? otpCode : undefined
      });
    } catch (err) {
      next(err);
    }
  },

  async phoneVerifyOtp(req, res, next) {
    try {
      const { countryCode, phoneNumber, code } = req.body;

      if (!countryCode || !phoneNumber || !code) {
        return res.status(400).json({ error: { message: 'Phone details and code are required.' } });
      }

      const phone = (countryCode.trim() + phoneNumber.trim()).replace(/[\s\-()]/g, '');

      const activeOtp = dbService.getOtp(phone, 'phone');
      if (!activeOtp) {
        return res.status(400).json({ error: { message: 'No active OTP verification session found.' } });
      }

      const now = new Date();
      if (now > new Date(activeOtp.expiresAt)) {
        dbService.deleteOtp(phone, 'phone');
        return res.status(400).json({ error: { message: 'OTP has expired. Please request a new one.' } });
      }

      if (activeOtp.code !== code.trim()) {
        return res.status(400).json({ error: { message: 'Incorrect OTP code.' } });
      }

      dbService.deleteOtp(phone, 'phone');

      // Generate verified session token
      const phoneVerificationToken = jwt.sign({ phone, verified: true }, env.jwtAccessSecret, { expiresIn: '10m' });

      // Check if user already exists with this phone number
      const users = dbService.getUsers();
      const existingUser = users.find(u => u.phoneNumber === phone);
      const isLoginFlow = (req.body.isLogin === true || req.body.flow === 'login');

      if (existingUser) {
        // Automatically log them in
        const accessToken = generateAccessToken(existingUser.email);
        const refreshToken = generateRefreshToken(existingUser.email, true);

        res.cookie(env.refreshCookieName, refreshToken, {
          httpOnly: true,
          secure: env.cookieSecure,
          sameSite: 'Lax',
          maxAge: env.refreshRememberTtlSeconds * 1000
        });

        return res.json({
          message: 'Phone number verified! Logged in.',
          verified: true,
          isRegistered: true,
          accessToken,
          user: { name: existingUser.name, email: existingUser.email }
        });
      } else {
        // Phone number is verified but no existing user account is found.
        // Return verification token to let the client complete progressive registration.
        return res.json({
          message: 'Phone number verified, but no account was found.',
          verified: true,
          isRegistered: false,
          phoneVerificationToken
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async phoneRegister(req, res, next) {
    try {
      const { countryCode, phoneNumber, phoneVerificationToken, name, email, password, confirmPassword, dob, gender } = req.body;

      if (!countryCode || !phoneNumber || !phoneVerificationToken || !name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: { message: 'All fields are required.' } });
      }

      // Verify token
      let tokenPayload;
      try {
        tokenPayload = jwt.verify(phoneVerificationToken, env.jwtAccessSecret);
      } catch (err) {
        return res.status(400).json({ error: { message: 'Verification session has expired. Please verify your phone again.' } });
      }

      const phone = (countryCode.trim() + phoneNumber.trim()).replace(/[\s\-()]/g, '');
      if (tokenPayload.phone !== phone || !tokenPayload.verified) {
        return res.status(400).json({ error: { message: 'Invalid verification token.' } });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: { message: 'Invalid email format.' } });
      }

      if (!validatePasswordStrength(password)) {
        return res.status(400).json({
          error: { message: 'Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character.' }
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: { message: 'Passwords do not match.' } });
      }

      // Check if user already exists
      const existingUser = dbService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: { message: 'Email already registered.' } });
      }

      const existingPhoneUser = dbService.getUsers().find(u => u.phoneNumber === phone);
      if (existingPhoneUser) {
        return res.status(400).json({ error: { message: 'Phone number already registered.' } });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = dbService.createUser({
        name,
        email,
        passwordHash,
        status: 'verified', // Phone verified, so account is verified
        dob: dob || null,
        gender: gender || null
      });

      // Update phone field
      dbService.updateUser(email, { phoneNumber: phone });

      const accessToken = generateAccessToken(user.email);
      const refreshToken = generateRefreshToken(user.email, true);

      res.cookie(env.refreshCookieName, refreshToken, {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'Lax',
        maxAge: env.refreshRememberTtlSeconds * 1000
      });

      res.json({
        message: 'Account registered successfully!',
        accessToken,
        user: { name: user.name, email: user.email }
      });
    } catch (err) {
      next(err);
    }
  },

  async phoneLogin(req, res, next) {
    try {
      const { countryCode, phoneNumber, phoneVerificationToken } = req.body;

      if (!countryCode || !phoneNumber || !phoneVerificationToken) {
        return res.status(400).json({ error: { message: 'All fields are required.' } });
      }

      // Verify token
      let tokenPayload;
      try {
        tokenPayload = jwt.verify(phoneVerificationToken, env.jwtAccessSecret);
      } catch (err) {
        return res.status(400).json({ error: { message: 'Verification session has expired. Please verify your phone again.' } });
      }

      const phone = (countryCode.trim() + phoneNumber.trim()).replace(/[\s\-()]/g, '');
      if (tokenPayload.phone !== phone || !tokenPayload.verified) {
        return res.status(400).json({ error: { message: 'Invalid verification token.' } });
      }

      const existingUser = dbService.getUsers().find(u => u.phoneNumber === phone);
      if (!existingUser) {
        return res.status(404).json({ error: { message: 'No account registered with this phone number.' } });
      }

      const accessToken = generateAccessToken(existingUser.email);
      const refreshToken = generateRefreshToken(existingUser.email, true);

      res.cookie(env.refreshCookieName, refreshToken, {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'Lax',
        maxAge: env.refreshRememberTtlSeconds * 1000
      });

      res.json({
        message: 'Login successful!',
        accessToken,
        user: { name: existingUser.name, email: existingUser.email }
      });
    } catch (err) {
      next(err);
    }
  },

  async checkEmail(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: { message: 'Email is required.' } });
      }
      const existingUser = dbService.getUserByEmail(email);
      if (existingUser && existingUser.status === 'verified') {
        return res.json({ exists: true, message: 'Email already registered.' });
      }
      return res.json({ exists: false });
    } catch (err) {
      next(err);
    }
  },

  async directEmailLogin(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: { message: 'Email is required.' } });
      }
      const user = dbService.getUserByEmail(email);
      if (!user || user.status !== 'verified') {
        return res.status(404).json({ error: { message: 'Account not found.' } });
      }
      const accessToken = generateAccessToken(user.email);
      const refreshToken = generateRefreshToken(user.email, true);
      
      res.cookie(env.refreshCookieName, refreshToken, {
        httpOnly: true,
        secure: env.cookieSecure,
        sameSite: 'Lax',
        maxAge: env.refreshRememberTtlSeconds * 1000
      });

      res.json({
        message: 'Login successful!',
        accessToken,
        user: { name: user.name, email: user.email }
      });
    } catch (err) {
      next(err);
    }
  },

  async firebaseLogin(req, res, next) {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        return res.status(400).json({ error: { message: 'ID token is required.' } });
      }

      // Verify the ID Token signature and claims
      let decoded;
      try {
        decoded = await verifyFirebaseIdToken(idToken, env.firebaseProjectId);
      } catch (err) {
        console.error('Firebase ID token verification failed:', err.message);
        return res.status(401).json({ error: { message: 'Invalid or expired authentication token.' } });
      }

      // Extract phone number from token
      const phone = decoded.phone_number;
      if (!phone) {
        return res.status(400).json({ error: { message: 'No phone number associated with this authentication token.' } });
      }

      // Check if user exists by phone number
      const users = dbService.getUsers();
      const user = users.find(u => u.phoneNumber && u.phoneNumber.replace(/[\s\-()]/g, '') === phone.replace(/[\s\-()]/g, ''));

      if (user) {
        // User exists! Issue session tokens
        const accessToken = generateAccessToken(user.email);
        const refreshToken = generateRefreshToken(user.email, true);

        res.cookie(env.refreshCookieName, refreshToken, {
          httpOnly: true,
          secure: env.cookieSecure,
          sameSite: 'Lax',
          maxAge: env.refreshRememberTtlSeconds * 1000
        });

        return res.json({
          message: 'Login successful!',
          isRegistered: true,
          accessToken,
          user: { name: user.name, email: user.email, phoneNumber: user.phoneNumber }
        });
      } else {
        // User does not exist! Proceed with signup wizard on client
        const phoneVerificationToken = jwt.sign({ phone, verified: true }, env.jwtAccessSecret, { expiresIn: '10m' });
        return res.json({
          message: 'Phone number verified. Proceed to register.',
          isRegistered: false,
          phoneNumber: phone,
          phoneVerificationToken
        });
      }
    } catch (err) {
      next(err);
    }
  }
};

const https = require('https');
let googlePublicKeysCache = {};
let cacheExpiresAt = 0;

function fetchGooglePublicKeys() {
  return new Promise((resolve, reject) => {
    if (Date.now() < cacheExpiresAt) {
      return resolve(googlePublicKeysCache);
    }
    https.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken-system@system.gserviceaccount.com', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const keys = JSON.parse(data);
          const cacheControl = res.headers['cache-control'];
          let maxAge = 3600;
          if (cacheControl) {
            const match = cacheControl.match(/max-age=(\d+)/);
            if (match) maxAge = parseInt(match[1], 10);
          }
          googlePublicKeysCache = keys;
          cacheExpiresAt = Date.now() + maxAge * 1000;
          resolve(keys);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function verifyFirebaseIdToken(idToken, projectId) {
  const decodedHeader = jwt.decode(idToken, { complete: true });
  if (!decodedHeader || !decodedHeader.header || !decodedHeader.header.kid) {
    throw new Error('Invalid Firebase ID Token format.');
  }
  const kid = decodedHeader.header.kid;
  const keys = await fetchGooglePublicKeys();
  const cert = keys[kid];
  if (!cert) {
    throw new Error('Firebase ID Token signed by unrecognized key.');
  }
  return jwt.verify(idToken, cert, {
    algorithms: ['RS256'],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`
  });
}

module.exports = authController;
