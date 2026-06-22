const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: process.env.NODE_ENV === 'development' ? 999999 : 5, // Bypass in development
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    if (req.body && req.body.email) {
      return `otp_${req.body.email.toLowerCase().trim()}`;
    }
    return `otp_${req.ip}`;
  },
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many OTP requests. Please try again after 5 minutes.'
      }
    });
  }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 999999 : 5, // Bypass in development
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    if (req.body && req.body.email) {
      return `login_${req.body.email.toLowerCase().trim()}`;
    }
    return `login_${req.ip}`;
  },
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many login attempts. Please try again after 15 minutes.'
      }
    });
  }
});

module.exports = {
  otpLimiter,
  loginLimiter
};
