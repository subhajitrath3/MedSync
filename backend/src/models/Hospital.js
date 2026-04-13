const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['hospital', 'clinic', 'diagnostic-center', 'pharmacy'],
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  facilities: [{
    type: String
  }],
  departments: [{
    type: String
  }],
  emergencyServices: {
    type: Boolean,
    default: false
  },
  operatingHours: {
    weekdays: {
      open: String,
      close: String
    },
    weekends: {
      open: String,
      close: String
    },
    is24x7: {
      type: Boolean,
      default: false
    }
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for location-based searches
hospitalSchema.index({ 'address.coordinates': '2dsphere' });

module.exports = mongoose.model('Hospital', hospitalSchema);
