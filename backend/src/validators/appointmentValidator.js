const { body, param } = require('express-validator');

// Create Appointment Validation
const createAppointmentValidator = [
  body('doctor')
    .notEmpty().withMessage('Doctor ID is required')
    .isMongoId().withMessage('Invalid doctor ID'),
  
  body('appointmentDate')
    .notEmpty().withMessage('Appointment date is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (appointmentDate < today) {
        throw new Error('Appointment date cannot be in the past');
      }
      return true;
    }),
  
  body('timeSlot.startTime')
    .notEmpty().withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format (use HH:MM)'),
  
  body('timeSlot.endTime')
    .notEmpty().withMessage('End time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format (use HH:MM)'),
  
  body('type')
    .optional()
    .isIn(['in-person', 'video', 'phone']).withMessage('Invalid appointment type'),
  
  body('reason')
    .trim()
    .notEmpty().withMessage('Reason for visit is required')
    .isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters'),
  
  body('symptoms')
    .optional()
    .isArray().withMessage('Symptoms must be an array')
];

// Update Appointment Validation
const updateAppointmentValidator = [
  body('appointmentDate')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('timeSlot.startTime')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format'),
  
  body('timeSlot.endTime')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format'),
  
  body('status')
    .optional()
    .isIn(['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status'),
  
  body('notes')
    .optional()
    .isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters')
];

// Appointment ID Param Validation
const appointmentIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid appointment ID')
];

module.exports = {
  createAppointmentValidator,
  updateAppointmentValidator,
  appointmentIdValidator
};
