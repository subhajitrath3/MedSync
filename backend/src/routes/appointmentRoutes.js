const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointment,
  bookAppointment,
  updateAppointment,
  cancelAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middlewares/auth');
const authorize = require('../middlewares/roleCheck');
const validate = require('../middlewares/validator');
const {
  createAppointmentValidator,
  updateAppointmentValidator,
  appointmentIdValidator
} = require('../validators/appointmentValidator');

// All routes are protected
router.use(protect);

router.get('/', getAppointments);
router.get('/:id', appointmentIdValidator, validate, getAppointment);

router.post(
  '/',
  authorize('patient'),
  createAppointmentValidator,
  validate,
  bookAppointment
);

router.put(
  '/:id',
  appointmentIdValidator,
  updateAppointmentValidator,
  validate,
  updateAppointment
);

router.delete('/:id', appointmentIdValidator, validate, cancelAppointment);

module.exports = router;
