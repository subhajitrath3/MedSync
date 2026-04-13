const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get all prescriptions (filtered by user)
 * @route   GET /api/prescriptions
 * @access  Private
 */
const getPrescriptions = async (req, res, next) => {
  try {
    const query = {};

    // Filter based on user role
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      query.doctor = doctor._id;
    }

    const prescriptions = await Prescription.find(query)
      .populate('patient', 'firstName lastName email phone')
      .populate('doctor')
      .populate('appointment')
      .sort({ prescriptionDate: -1 });

    ApiResponse.success(res, 200, { prescriptions, count: prescriptions.length }, 'Prescriptions retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single prescription
 * @route   GET /api/prescriptions/:id
 * @access  Private
 */
const getPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patient', 'firstName lastName email phone')
      .populate('doctor')
      .populate('appointment');

    if (!prescription) {
      return ApiResponse.notFound(res, 'Prescription not found');
    }

    // Check authorization
    if (req.user.role === 'patient' && prescription.patient._id.toString() !== req.user._id.toString()) {
      return ApiResponse.forbidden(res, 'Not authorized');
    }

    ApiResponse.success(res, 200, { prescription }, 'Prescription retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create prescription
 * @route   POST /api/prescriptions
 * @access  Private (Doctor)
 */
const createPrescription = async (req, res, next) => {
  try {
    const { appointment, patient, diagnosis, medications, tests, advice, followUpDate } = req.body;

    // Get doctor profile
    const doctor = await Doctor.findOne({ user: req.user._id });

    if (!doctor) {
      return ApiResponse.forbidden(res, 'Only doctors can create prescriptions');
    }

    // Check if appointment exists
    const appointmentExists = await Appointment.findById(appointment);
    if (!appointmentExists) {
      return ApiResponse.notFound(res, 'Appointment not found');
    }

    // Create prescription
    const prescription = await Prescription.create({
      appointment,
      patient,
      doctor: doctor._id,
      diagnosis,
      medications,
      tests: tests || [],
      advice,
      followUpDate,
      validUntil: followUpDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    // Update appointment with prescription
    await Appointment.findByIdAndUpdate(appointment, { prescription: prescription._id });

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate('patient', 'firstName lastName email phone')
      .populate('doctor')
      .populate('appointment');

    ApiResponse.created(res, { prescription: populatedPrescription }, 'Prescription created successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update prescription
 * @route   PUT /api/prescriptions/:id
 * @access  Private (Doctor)
 */
const updatePrescription = async (req, res, next) => {
  try {
    let prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return ApiResponse.notFound(res, 'Prescription not found');
    }

    // Get doctor profile
    const doctor = await Doctor.findOne({ user: req.user._id });

    // Check authorization
    if (prescription.doctor.toString() !== doctor._id.toString()) {
      return ApiResponse.forbidden(res, 'Not authorized');
    }

    prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('patient', 'firstName lastName email phone')
     .populate('doctor')
     .populate('appointment');

    ApiResponse.success(res, 200, { prescription }, 'Prescription updated successfully');

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription
};
