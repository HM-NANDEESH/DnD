const jwt = require('jsonwebtoken');
const env = require('../config/env');
const dbService = require('../services/dbService');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Access token missing or invalid.'
      }
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, env.jwtAccessSecret);
    const user = await dbService.getUserByEmail(payload.email);
    if (!user) {
      return res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'User profile does not exist.'
        }
      });
    }

    req.user = {
      name: user.name,
      email: user.email,
      status: user.status
    };
    next();
  } catch (err) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Access token expired or malformed.'
      }
    });
  }
}

module.exports = authMiddleware;
