const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    enum: [
      'Cardiologist',
      'Dermatologist',
      'Neurologist',
      'Pediatrician',
      'Orthopedic',
      'Psychiatrist',
      'General Physician',
      'Gynecologist',
      'Ophthalmologist',
      'ENT Specialist',
      'Dentist',
      'Other'
    ]
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: [0, 'Experience cannot be negative']
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  consultationFee: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: [0, 'Fee cannot be negative']
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  clinicAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    slots: [{
      startTime: String, // Format: "09:00"
      endTime: String,   // Format: "17:00"
      isBooked: {
        type: Boolean,
        default: false
      }
    }]
  }],
  languages: [{
    type: String
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  totalPatients: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingPatients: {
    type: Boolean,
    default: true
  },
  awards: [{
    title: String,
    year: Number
  }],
  certifications: [{
    name: String,
    issuedBy: String,
    year: Number
  }]
}, {
  timestamps: true
});

// Index for searching
doctorSchema.index({ specialization: 1, 'clinicAddress.city': 1 });
doctorSchema.index({ 'rating.average': -1 });

module.exports = mongoose.model('Doctor', doctorSchema);
