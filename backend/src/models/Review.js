const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  isVerified: {
    type: Boolean,
    default: true // Since it's linked to an appointment
  }
}, {
  timestamps: true
});

// Prevent multiple reviews for same appointment
reviewSchema.index({ appointment: 1 }, { unique: true });
reviewSchema.index({ doctor: 1, createdAt: -1 });

// Update doctor's rating after saving review
reviewSchema.post('save', async function() {
  const Doctor = mongoose.model('Doctor');
  
  const stats = await this.constructor.aggregate([
    { $match: { doctor: this.doctor } },
    {
      $group: {
        _id: '$doctor',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(this.doctor, {
      'rating.average': stats[0].averageRating.toFixed(1),
      'rating.count': stats[0].totalReviews
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
