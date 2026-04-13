/**
 * Standardized API Response Utility
 */

class ApiResponse {
  /**
   * Success Response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {*} data - Response data
   * @param {String} message - Success message
   */
  static success(res, statusCode = 200, data = null, message = 'Success') {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  /**
   * Error Response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {String} message - Error message
   * @param {Object} errors - Error details
   */
  static error(res, statusCode = 500, message = 'Internal Server Error', errors = null) {
    const response = {
      success: false,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Paginated Response
   * @param {Object} res - Express response object
   * @param {Array} data - Array of items
   * @param {Number} page - Current page number
   * @param {Number} limit - Items per page
   * @param {Number} total - Total items
   * @param {String} message - Success message
   */
  static paginated(res, data, page, limit, total, message = 'Success') {
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  }

  /**
   * Created Response (201)
   */
  static created(res, data = null, message = 'Resource created successfully') {
    return this.success(res, 201, data, message);
  }

  /**
   * No Content Response (204)
   */
  static noContent(res) {
    return res.status(204).send();
  }

  /**
   * Bad Request Response (400)
   */
  static badRequest(res, message = 'Bad Request', errors = null) {
    return this.error(res, 400, message, errors);
  }

  /**
   * Unauthorized Response (401)
   */
  static unauthorized(res, message = 'Unauthorized') {
    return this.error(res, 401, message);
  }

  /**
   * Forbidden Response (403)
   */
  static forbidden(res, message = 'Forbidden') {
    return this.error(res, 403, message);
  }

  /**
   * Not Found Response (404)
   */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, 404, message);
  }

  /**
   * Conflict Response (409)
   */
  static conflict(res, message = 'Resource already exists') {
    return this.error(res, 409, message);
  }

  /**
   * Validation Error Response (422)
   */
  static validationError(res, errors, message = 'Validation failed') {
    return this.error(res, 422, message, errors);
  }

  /**
   * Internal Server Error Response (500)
   */
  static serverError(res, message = 'Internal Server Error') {
    return this.error(res, 500, message);
  }
}

module.exports = ApiResponse;
