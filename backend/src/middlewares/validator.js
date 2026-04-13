const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/apiResponse');

/**
 * Validate Request Middleware
 * Works with express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));

    return ApiResponse.validationError(res, formattedErrors, 'Validation failed');
  }

  next();
};

module.exports = validate;
