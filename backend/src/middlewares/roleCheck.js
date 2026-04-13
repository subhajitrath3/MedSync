const ApiResponse = require('../utils/apiResponse');

/**
 * Role-based Access Control Middleware
 * @param  {...String} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.forbidden(
        res,
        `User role '${req.user.role}' is not authorized to access this route`
      );
    }

    next();
  };
};

module.exports = authorize;
