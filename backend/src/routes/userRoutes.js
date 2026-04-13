const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validator');
const { changePasswordValidator } = require('../validators/authValidator');

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePasswordValidator, validate, changePassword);
router.delete('/account', deleteAccount);

module.exports = router;
