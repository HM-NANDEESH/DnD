require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const env = require('./server/config/env');
const authRoutes = require('./server/routes/authRoutes');

const app = express();
const publicDir = __dirname;

app.set('trust proxy', 1);
app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  next();
});
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Auth API Routes
app.use('/api/auth', authRoutes);

app.use(express.static(publicDir, {
  extensions: ['html'],
  setHeaders(res, filePath) {
    if (filePath.endsWith('sw.js')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Service-Worker-Allowed', '/');
    }
  }
}));

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    return res.sendFile(path.join(publicDir, 'index.html'));
  }
  return next();
});

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found.'
    }
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  return res.status(500).json({
    error: {
      code: 'SERVER_ERROR',
      message: env.isProduction ? 'Something went wrong.' : error.message
    }
  });
});

app.listen(env.port, '0.0.0.0', () => {
  console.log(`DnD app listening on ${env.appUrl}`);
});
