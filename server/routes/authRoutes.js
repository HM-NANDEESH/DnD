const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { otpLimiter, loginLimiter } = require('../middleware/rateLimiter');

router.post('/signup', otpLimiter, authController.signup);
router.post('/check-email', authController.checkEmail);
router.post('/verify-otp', authController.verifyOtp);
router.post('/resend-otp', otpLimiter, authController.resendOtp);

router.post('/login', loginLimiter, authController.login);
router.post('/direct-email-login', authController.directEmailLogin);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

router.post('/forgot-password', otpLimiter, authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// SSO & Phone Authentication endpoints
router.post('/sso-login', authController.ssoLogin);
router.post('/phone-send-otp', otpLimiter, authController.phoneSendOtp);
router.post('/phone-verify-otp', authController.phoneVerifyOtp);
router.post('/phone-register', authController.phoneRegister);
router.post('/phone-login', authController.phoneLogin);
router.post('/firebase-login', authController.firebaseLogin);

// Protected route to check token validity and fetch profile
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
