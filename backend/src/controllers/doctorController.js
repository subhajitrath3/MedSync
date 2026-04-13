const Doctor = require('../models/Doctor');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');
const { parseFilters } = require('../utils/helpers');

/**
 * @desc    Get all doctors with filters
 * @route   GET /api/doctors
 * @access  Public
 */
const getAllDoctors = async (req, res, next) => {
  try {
    const { filters, page, limit, skip } = parseFilters(req.query);

    // Build query
    const query = {};

    if (filters.specialization) {
      query.specialization = filters.specialization;
    }

    if (filters.city) {
      query['clinicAddress.city'] = new RegExp(filters.city, 'i');
    }

    if (filters.rating_min) {
      query['rating.average'] = { $gte: parseFloat(filters.rating_min) };
    }

    if (filters.experience_min) {
      query.experience = { $gte: parseInt(filters.experience_min) };
    }

    if (filters.available !== undefined) {
      query.isAcceptingPatients = filters.available === 'true';
    }

    // Get total count
    const total = await Doctor.countDocuments(query);

    // Get doctors
    const doctors = await Doctor.find(query)
      .populate('user', 'firstName lastName email phone avatar')
      .populate('hospital', 'name address')
      .skip(skip)
      .limit(limit)
      .sort({ 'rating.average': -1 });

    ApiResponse.paginated(res, doctors, page, limit, total, 'Doctors retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single doctor
 * @route   GET /api/doctors/:id
 * @access  Public
 */
const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'firstName lastName email phone avatar')
      .populate('hospital', 'name address contact');

    if (!doctor) {
      return ApiResponse.notFound(res, 'Doctor not found');
    }

    ApiResponse.success(res, 200, { doctor }, 'Doctor retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create doctor profile
 * @route   POST /api/doctors
 * @access  Private (Admin/Doctor)
 */
const createDoctor = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ user: userId });
    if (existingDoctor) {
      return ApiResponse.conflict(res, 'Doctor profile already exists');
    }

    // Create doctor profile
    const doctor = await Doctor.create({
      user: userId,
      ...req.body
    });

    // Update user role to doctor
    await User.findByIdAndUpdate(userId, { role: 'doctor' });

    const populatedDoctor = await Doctor.findById(doctor._id)
      .populate('user', 'firstName lastName email phone');

    ApiResponse.created(res, { doctor: populatedDoctor }, 'Doctor profile created successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update doctor profile
 * @route   PUT /api/doctors/:id
 * @access  Private (Doctor/Admin)
 */
const updateDoctor = async (req, res, next) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return ApiResponse.notFound(res, 'Doctor not found');
    }

    // Check authorization
    if (req.user.role !== 'admin' && doctor.user.toString() !== req.user._id.toString()) {
      return ApiResponse.forbidden(res, 'Not authorized to update this profile');
    }

    doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email phone');

    ApiResponse.success(res, 200, { doctor }, 'Doctor profile updated successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete doctor
 * @route   DELETE /api/doctors/:id
 * @access  Private (Admin)
 */
const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return ApiResponse.notFound(res, 'Doctor not found');
    }

    await doctor.deleteOne();

    ApiResponse.success(res, 200, null, 'Doctor deleted successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search doctors
 * @route   GET /api/doctors/search
 * @access  Public
 */
const searchDoctors = async (req, res, next) => {
  try {
    const { q, specialization, city } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { 'user.firstName': new RegExp(q, 'i') },
        { 'user.lastName': new RegExp(q, 'i') },
        { specialization: new RegExp(q, 'i') }
      ];
    }

    if (specialization) {
      query.specialization = specialization;
    }

    if (city) {
      query['clinicAddress.city'] = new RegExp(city, 'i');
    }

    const doctors = await Doctor.find(query)
      .populate('user', 'firstName lastName email phone avatar')
      .limit(20);

    ApiResponse.success(res, 200, { doctors, count: doctors.length }, 'Search results');

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctors
};
