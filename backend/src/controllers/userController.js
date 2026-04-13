const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    ApiResponse.success(res, 200, { user }, 'Profile retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, dateOfBirth, gender, address, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName,
        lastName,
        phone,
        dateOfBirth,
        gender,
        address,
        avatar
      },
      { new: true, runValidators: true }
    );

    ApiResponse.success(res, 200, { user }, 'Profile updated successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Change password
 * @route   PUT /api/users/change-password
 * @access  Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return ApiResponse.badRequest(res, 'Current password is incorrect');
    }

    // Set new password
    user.password = newPassword;
    await user.save();

    ApiResponse.success(res, 200, null, 'Password changed successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete account
 * @route   DELETE /api/users/account
 * @access  Private
 */
const deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    ApiResponse.success(res, 200, null, 'Account deactivated successfully');

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
};
