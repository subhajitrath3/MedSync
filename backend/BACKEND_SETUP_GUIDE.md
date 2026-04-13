# MedSync Backend Setup Guide - Complete MongoDB Implementation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [Database Schema Design](#database-schema-design)
6. [API Endpoints](#api-endpoints)
7. [Authentication & Security](#authentication--security)
8. [Testing](#testing)
9. [Deployment](#deployment)

---

## Project Overview

This backend will power the MedSync medical appointment platform with the following features:
- User authentication (Patients, Doctors, Admins)
- Doctor profile management
- Appointment booking system
- Digital prescription management
- Search and filter functionality
- Real-time availability tracking
- Rating and review system

**Tech Stack:**
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi or Express-validator
- **File Upload:** Multer (for profile images, prescriptions)
- **Email:** Nodemailer
- **Security:** Helmet, CORS, bcrypt

---

## Prerequisites

### Required Software
1. **Node.js (v18 or higher)**
   ```bash
   node --version  # Should be v18+
   ```
   Download from: https://nodejs.org/

2. **MongoDB**
   
   **Option A - MongoDB Atlas (Cloud - Recommended for beginners):**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a new cluster (free tier)
   - Get your connection string
   
   **Option B - Local MongoDB:**
   ```bash
   # Windows (using installer)
   Download from: https://www.mongodb.com/try/download/community
   
   # Or using Chocolatey
   choco install mongodb
   
   # Verify installation
   mongod --version
   ```

3. **Git** (for version control)
   ```bash
   git --version
   ```

4. **Postman or Thunder Client** (for API testing)

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js         # MongoDB connection
│   │   ├── jwt.js              # JWT configuration
│   │   └── cloudinary.js       # Image upload config (optional)
│   │
│   ├── models/
│   │   ├── User.js             # User model (patients, doctors, admins)
│   │   ├── Doctor.js           # Doctor profile details
│   │   ├── Appointment.js      # Appointment bookings
│   │   ├── Prescription.js     # Digital prescriptions
│   │   ├── Review.js           # Doctor reviews/ratings
│   │   └── Hospital.js         # Hospital/clinic data
│   │
│   ├── controllers/
│   │   ├── authController.js   # Login, register, password reset
│   │   ├── userController.js   # User profile management
│   │   ├── doctorController.js # Doctor CRUD operations
│   │   ├── appointmentController.js
│   │   ├── prescriptionController.js
│   │   └── reviewController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── prescriptionRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── middlewares/
│   │   ├── auth.js             # JWT verification
│   │   ├── errorHandler.js     # Global error handling
│   │   ├── validator.js        # Request validation
│   │   ├── roleCheck.js        # Role-based access control
│   │   └── upload.js           # File upload middleware
│   │
│   ├── utils/
│   │   ├── emailService.js     # Email notifications
│   │   ├── tokenGenerator.js   # JWT token generation
│   │   ├── apiResponse.js      # Standardized API responses
│   │   └── helpers.js          # Utility functions
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── doctorValidator.js
│   │   └── appointmentValidator.js
│   │
│   └── app.js                  # Express app setup
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env                        # Environment variables
├── .env.example               # Environment template
├── .gitignore
├── package.json
├── server.js                   # Entry point
└── README.md
```

---

## Step-by-Step Setup

### Step 1: Initialize Project

```bash
# Navigate to backend folder
cd backend

# Initialize npm project
npm init -y

# Install production dependencies
npm install express mongoose dotenv cors helmet morgan bcryptjs jsonwebtoken joi express-validator nodemailer multer cloudinary cookie-parser express-rate-limit compression

# Install development dependencies
npm install --save-dev nodemon jest supertest @types/node
```

### Step 2: Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --watchAll --verbose",
    "test:once": "jest --verbose"
  }
}
```

### Step 3: Create Environment Variables

Create `.env` file in backend root:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/medsync
# For MongoDB Atlas use:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/medsync?retryWrites=true&w=majority

# JWT Secret Keys
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_key
JWT_REFRESH_EXPIRE=30d

# Email Configuration (using Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=MedSync <noreply@medsync.com>

# Cloudinary (for image uploads - optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

Create `.env.example` (same as above but without actual values)

### Step 4: Create .gitignore

```
node_modules/
.env
.env.local
.env.production
.DS_Store
*.log
coverage/
dist/
uploads/
.vscode/
```

---

## Database Schema Design

### 1. User Model (`src/models/User.js`)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't return password in queries by default
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient'
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'USA'
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtuals are included in JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
```

### 2. Doctor Model (`src/models/Doctor.js`)

```javascript
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
```

### 3. Appointment Model (`src/models/Appointment.js`)

```javascript
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['in-person', 'video', 'phone'],
    default: 'in-person'
  },
  reason: {
    type: String,
    required: [true, 'Reason for visit is required'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  symptoms: [{
    type: String
  }],
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  fee: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'insurance', 'online']
  },
  cancellationReason: {
    type: String
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
appointmentSchema.index({ patient: 1, appointmentDate: -1 });
appointmentSchema.index({ doctor: 1, appointmentDate: -1 });
appointmentSchema.index({ status: 1 });

// Prevent double booking
appointmentSchema.index(
  { doctor: 1, appointmentDate: 1, 'timeSlot.startTime': 1 },
  { unique: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
```

### 4. Prescription Model (`src/models/Prescription.js`)

```javascript
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
```

### 5. Review Model (`src/models/Review.js`)

```javascript
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
```

### 6. Hospital Model (`src/models/Hospital.js`)

```javascript
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
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

```
POST   /api/auth/register              - Register new user
POST   /api/auth/login                 - Login user
POST   /api/auth/logout                - Logout user
POST   /api/auth/refresh-token         - Refresh access token
POST   /api/auth/forgot-password       - Send password reset email
POST   /api/auth/reset-password/:token - Reset password
POST   /api/auth/verify-email/:token   - Verify email address
GET    /api/auth/me                    - Get current user
```

### User Routes (`/api/users`)

```
GET    /api/users/profile              - Get user profile
PUT    /api/users/profile              - Update user profile
PUT    /api/users/change-password      - Change password
DELETE /api/users/account              - Delete account
POST   /api/users/avatar               - Upload avatar
```

### Doctor Routes (`/api/doctors`)

```
GET    /api/doctors                    - Get all doctors (with filters)
GET    /api/doctors/:id                - Get single doctor
POST   /api/doctors                    - Create doctor profile (admin/doctor)
PUT    /api/doctors/:id                - Update doctor profile
DELETE /api/doctors/:id                - Delete doctor (admin only)
GET    /api/doctors/search             - Search doctors
GET    /api/doctors/:id/availability   - Get doctor's availability
PUT    /api/doctors/:id/availability   - Update availability
GET    /api/doctors/:id/reviews        - Get doctor reviews
GET    /api/doctors/specialization/:spec - Get doctors by specialization
```

### Appointment Routes (`/api/appointments`)

```
GET    /api/appointments               - Get all appointments (filtered by user)
GET    /api/appointments/:id           - Get single appointment
POST   /api/appointments               - Book appointment
PUT    /api/appointments/:id           - Update appointment
DELETE /api/appointments/:id           - Cancel appointment
GET    /api/appointments/patient/:id   - Get patient's appointments
GET    /api/appointments/doctor/:id    - Get doctor's appointments
PUT    /api/appointments/:id/status    - Update appointment status
PUT    /api/appointments/:id/reschedule - Reschedule appointment
```

### Prescription Routes (`/api/prescriptions`)

```
GET    /api/prescriptions              - Get all prescriptions (filtered)
GET    /api/prescriptions/:id          - Get single prescription
POST   /api/prescriptions              - Create prescription (doctor only)
PUT    /api/prescriptions/:id          - Update prescription
GET    /api/prescriptions/patient/:id  - Get patient's prescriptions
GET    /api/prescriptions/appointment/:id - Get prescription by appointment
DELETE /api/prescriptions/:id          - Delete prescription
POST   /api/prescriptions/:id/download - Download prescription PDF
```

### Review Routes (`/api/reviews`)

```
POST   /api/reviews                    - Create review
GET    /api/reviews/doctor/:doctorId   - Get doctor's reviews
PUT    /api/reviews/:id                - Update review
DELETE /api/reviews/:id                - Delete review
```

### Hospital Routes (`/api/hospitals`)

```
GET    /api/hospitals                  - Get all hospitals
GET    /api/hospitals/:id              - Get single hospital
POST   /api/hospitals                  - Create hospital (admin)
PUT    /api/hospitals/:id              - Update hospital
DELETE /api/hospitals/:id              - Delete hospital
GET    /api/hospitals/nearby           - Get nearby hospitals
```

---

## Authentication & Security

### JWT Token Strategy

**Access Token:** Short-lived (15-60 minutes)
**Refresh Token:** Long-lived (7-30 days)

### Security Middlewares

1. **Helmet** - Secure HTTP headers
2. **CORS** - Cross-Origin Resource Sharing
3. **Rate Limiting** - Prevent brute force attacks
4. **Input Validation** - Sanitize user input
5. **MongoDB Injection Prevention** - Use Mongoose sanitization
6. **Password Hashing** - bcrypt with 10+ salt rounds

### Role-Based Access Control (RBAC)

```
Admin:    Full access to all resources
Doctor:   Manage own profile, appointments, prescriptions
Patient:  Book appointments, view own data
```

---

## Testing

### Unit Tests
Test individual functions and models

### Integration Tests
Test API endpoints

```bash
npm test
```

---

## Deployment

### Environment Setup
1. Set all environment variables
2. Use MongoDB Atlas for production
3. Enable MongoDB encryption at rest
4. Set up SSL/TLS certificates
5. Use a process manager (PM2)

### Hosting Options
- **AWS EC2** - Full control
- **Heroku** - Easy deployment
- **DigitalOcean** - Cost-effective
- **Vercel/Railway** - Serverless

---

## Next Steps

1. ✅ Set up project structure
2. ✅ Install dependencies
3. ⏳ Configure database connection
4. ⏳ Create models
5. ⏳ Build controllers
6. ⏳ Set up routes
7. ⏳ Add authentication
8. ⏳ Implement error handling
9. ⏳ Test API endpoints
10. ⏳ Deploy to production

**Ready to start coding? Let's build the backend files!** 🚀
