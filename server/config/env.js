const required = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const numberFromEnv = (name, fallback) => {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return parsed;
};

const boolFromEnv = (name, fallback) => {
  const raw = process.env[name];
  if (raw === undefined) return fallback;
  return raw === 'true';
};

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: numberFromEnv('PORT', 3000),
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  jwtAccessSecret: required('JWT_ACCESS_SECRET'),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET'),
  accessTokenTtlSeconds: numberFromEnv('ACCESS_TOKEN_TTL_SECONDS', 15 * 60),
  refreshSessionTtlSeconds: numberFromEnv('REFRESH_TOKEN_SESSION_TTL_SECONDS', 24 * 60 * 60),
  refreshRememberTtlSeconds: numberFromEnv('REFRESH_TOKEN_REMEMBER_TTL_SECONDS', 30 * 24 * 60 * 60),
  refreshCookieName: process.env.REFRESH_COOKIE_NAME || 'dnd_refresh_token',
  cookieSecure: boolFromEnv('AUTH_COOKIE_SECURE', nodeEnv === 'production'),
  otpExpiresMinutes: numberFromEnv('OTP_EXPIRES_MINUTES', 10),
  otpCooldownSeconds: numberFromEnv('OTP_COOLDOWN_SECONDS', 45),
  smtp: {
    host: required('SMTP_HOST'),
    port: numberFromEnv('SMTP_PORT', 587),
    secure: boolFromEnv('SMTP_SECURE', false),
    user: required('SMTP_USER'),
    pass: required('SMTP_PASS'),
    from: process.env.SMTP_FROM || required('SMTP_USER')
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_FROM_NUMBER
  },
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || 'dnd-life-tracker'
};
