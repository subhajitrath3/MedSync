const { body, param } = require('express-validator');

// Create Doctor Profile Validation
const createDoctorValidator = [
  body('specialization')
    .notEmpty().withMessage('Specialization is required')
    .isIn([
      'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician',
      'Orthopedic', 'Psychiatrist', 'General Physician', 'Gynecologist',
      'Ophthalmologist', 'ENT Specialist', 'Dentist', 'Other'
    ]).withMessage('Invalid specialization'),
  
  body('experience')
    .notEmpty().withMessage('Experience is required')
    .isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  
  body('licenseNumber')
    .trim()
    .notEmpty().withMessage('License number is required'),
  
  body('consultationFee')
    .notEmpty().withMessage('Consultation fee is required')
    .isFloat({ min: 0 }).withMessage('Fee must be a positive number'),
  
  body('bio')
    .optional()
    .isLength({ max: 1000 }).withMessage('Bio cannot exceed 1000 characters'),
  
  body('clinicAddress.city')
    .optional()
    .trim()
    .notEmpty().withMessage('City is required if address provided'),
  
  body('languages')
    .optional()
    .isArray().withMessage('Languages must be an array')
];

// Update Doctor Profile Validation
const updateDoctorValidator = [
  body('specialization')
    .optional()
    .isIn([
      'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician',
      'Orthopedic', 'Psychiatrist', 'General Physician', 'Gynecologist',
      'Ophthalmologist', 'ENT Specialist', 'Dentist', 'Other'
    ]).withMessage('Invalid specialization'),
  
  body('experience')
    .optional()
    .isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  
  body('consultationFee')
    .optional()
    .isFloat({ min: 0 }).withMessage('Fee must be a positive number'),
  
  body('bio')
    .optional()
    .isLength({ max: 1000 }).withMessage('Bio cannot exceed 1000 characters')
];

// Doctor ID Param Validation
const doctorIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid doctor ID')
];

module.exports = {
  createDoctorValidator,
  updateDoctorValidator,
  doctorIdValidator
};
