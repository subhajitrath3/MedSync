const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get all appointments (filtered by user)
 * @route   GET /api/appointments
 * @access  Private
 */
const getAppointments = async (req, res, next) => {
  try {
    const query = {};

    // Filter based on user role
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      query.doctor = doctor._id;
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName email phone')
      .populate('doctor')
      .sort({ appointmentDate: -1 });

    ApiResponse.success(res, 200, { appointments, count: appointments.length }, 'Appointments retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single appointment
 * @route   GET /api/appointments/:id
 * @access  Private
 */
const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'firstName lastName email phone')
      .populate('doctor')
      .populate('prescription');

    if (!appointment) {
      return ApiResponse.notFound(res, 'Appointment not found');
    }

    // Check authorization
    if (req.user.role === 'patient' && appointment.patient._id.toString() !== req.user._id.toString()) {
      return ApiResponse.forbidden(res, 'Not authorized');
    }

    ApiResponse.success(res, 200, { appointment }, 'Appointment retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Book appointment
 * @route   POST /api/appointments
 * @access  Private (Patient)
 */
const bookAppointment = async (req, res, next) => {
  try {
    const { doctor, appointmentDate, timeSlot, type, reason, symptoms } = req.body;

    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return ApiResponse.notFound(res, 'Doctor not found');
    }

    // Check if doctor is accepting patients
    if (!doctorExists.isAcceptingPatients) {
      return ApiResponse.badRequest(res, 'Doctor is not accepting new patients');
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      appointmentDate,
      timeSlot,
      type: type || 'in-person',
      reason,
      symptoms: symptoms || [],
      fee: doctorExists.consultationFee
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'firstName lastName email phone')
      .populate('doctor');

    ApiResponse.created(res, { appointment: populatedAppointment }, 'Appointment booked successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update appointment
 * @route   PUT /api/appointments/:id
 * @access  Private
 */
const updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return ApiResponse.notFound(res, 'Appointment not found');
    }

    // Check authorization
    if (req.user.role === 'patient' && appointment.patient.toString() !== req.user._id.toString()) {
      return ApiResponse.forbidden(res, 'Not authorized');
    }

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('patient', 'firstName lastName email phone')
     .populate('doctor');

    ApiResponse.success(res, 200, { appointment }, 'Appointment updated successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private
 */
const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return ApiResponse.notFound(res, 'Appointment not found');
    }

    // Check authorization
    if (req.user.role === 'patient' && appointment.patient.toString() !== req.user._id.toString()) {
      return ApiResponse.forbidden(res, 'Not authorized');
    }

    appointment.status = 'cancelled';
    appointment.cancelledBy = req.user._id;
    appointment.cancelledAt = Date.now();
    appointment.cancellationReason = req.body.reason || 'No reason provided';

    await appointment.save();

    ApiResponse.success(res, 200, { appointment }, 'Appointment cancelled successfully');

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  bookAppointment,
  updateAppointment,
  cancelAppointment
};
