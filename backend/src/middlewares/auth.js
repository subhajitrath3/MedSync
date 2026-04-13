const { verifyAccessToken } = require('../utils/tokenGenerator');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return ApiResponse.unauthorized(res, 'Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return ApiResponse.unauthorized(res, 'User not found');
    }

    if (!req.user.isActive) {
      return ApiResponse.forbidden(res, 'Account is inactive');
    }

    next();
  } catch (error) {
    return ApiResponse.unauthorized(res, 'Invalid or expired token');
  }
};

/**
 * Optional auth - Does not fail if no token
 */
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = verifyAccessToken(token);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Continue without user
    }
  }

  next();
};

module.exports = { protect, optionalAuth };
