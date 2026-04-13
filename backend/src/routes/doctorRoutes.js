const express = require('express');
const router = express.Router();
const {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctors
} = require('../controllers/doctorController');
const { protect, optionalAuth } = require('../middlewares/auth');
const authorize = require('../middlewares/roleCheck');
const validate = require('../middlewares/validator');
const {
  createDoctorValidator,
  updateDoctorValidator,
  doctorIdValidator
} = require('../validators/doctorValidator');

// Public routes
router.get('/', optionalAuth, getAllDoctors);
router.get('/search', searchDoctors);
router.get('/:id', doctorIdValidator, validate, getDoctor);

// Protected routes
router.post(
  '/',
  protect,
  authorize('doctor', 'admin'),
  createDoctorValidator,
  validate,
  createDoctor
);

router.put(
  '/:id',
  protect,
  authorize('doctor', 'admin'),
  doctorIdValidator,
  updateDoctorValidator,
  validate,
  updateDoctor
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  doctorIdValidator,
  validate,
  deleteDoctor
);

module.exports = router;
