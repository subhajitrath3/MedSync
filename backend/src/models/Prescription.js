const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  diagnosis: {
    type: String,
    required: [true, 'Diagnosis is required'],
    maxlength: [1000, 'Diagnosis cannot exceed 1000 characters']
  },
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true // e.g., "Twice daily", "Every 8 hours"
    },
    duration: {
      type: String,
      required: true // e.g., "7 days", "2 weeks"
    },
    instructions: {
      type: String // e.g., "Take with food"
    }
  }],
  tests: [{
    name: String,
    notes: String
  }],
  advice: {
    type: String,
    maxlength: [2000, 'Advice cannot exceed 2000 characters']
  },
  followUpDate: {
    type: Date
  },
  prescriptionDate: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date
  },
  digitalSignature: {
    type: String // Base64 encoded signature or URL
  },
  isActive: {
    type: Boolean,
    default: true
  },
  qrCode: {
    type: String // QR code for verification
  }
}, {
  timestamps: true
});

// Index for searching
prescriptionSchema.index({ patient: 1, prescriptionDate: -1 });
prescriptionSchema.index({ doctor: 1, prescriptionDate: -1 });

module.exports = mongoose.model('Prescription', prescriptionSchema);
