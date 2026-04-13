# Frontend-Backend Requirements Document

**MedSync Platform - Backend Development Reference**

This document outlines all frontend components, data structures, variables, and API requirements that the backend needs to support.

---

## Table of Contents
1. [Core Routes](#core-routes)
2. [Data Models](#data-models)
3. [API Endpoints Required](#api-endpoints-required)
4. [Authentication & Authorization](#authentication--authorization)
5. [Search & Filter Requirements](#search--filter-requirements)
6. [Real-time Features](#real-time-features)
7. [Third-party Integrations](#third-party-integrations)

---

## Core Routes

The frontend has the following routes that require backend support:

| Route | Purpose | Backend Needs |
|-------|---------|---------------|
| `/` | Home page | Static content (stats, testimonials) |
| `/find-doctors` | Doctor search & listing | Doctor search API, filtering, pagination |
| `/digital-prescription` | Prescription management | Prescription CRUD, medical records API |
| `/how-it-works` | Information page | Static content |
| `/about` | About page | Static content, team info |
| `/contact` | Contact form | Contact form submission API |

---

## Data Models

### 1. Doctor Model

**Frontend Interface:**
```typescript
interface Doctor {
  name: string;              // Full name of the doctor
  specialization: string;    // Medical specialization
  experience: number;        // Years of experience
  hospital: string;          // Hospital/clinic name
  rating: number;            // Rating out of 5 (e.g., 4.9)
  available: boolean;        // Current availability status
  image: string;             // Profile image URL
}
```

**Backend Requirements:**
- Unique doctor ID (not shown in frontend mockup)
- Full CRUD operations
- Rating calculation and updates
- Availability scheduling system
- Image storage and retrieval
- Search indexing for name, specialization, hospital

**Additional Fields Needed:**
- `id`: UUID or ObjectId
- `email`: Contact email
- `phone`: Contact phone number
- `address`: Physical address
- `qualifications`: Array of degrees/certifications
- `languages`: Array of languages spoken
- `consultation_fee`: Numeric value
- `availability_schedule`: Time slots array
- `created_at`: Timestamp
- `updated_at`: Timestamp

---

### 2. Prescription Model

**Frontend Interface:**
```typescript
interface Prescription {
  date: string;              // Prescription date (e.g., "Dec 12, 2024")
  doctor: string;            // Doctor's name
  diagnosis: string;         // Medical diagnosis
  medications: string[];     // Array of medication names with dosage
  status: string;            // "Active" | "Completed"
}
```

**Backend Requirements:**
- Prescription creation and retrieval
- Auto-sync across connected systems
- Status management workflow
- Association with patient and doctor records

**Additional Fields Needed:**
- `id`: UUID or ObjectId
- `patient_id`: Reference to patient
- `doctor_id`: Reference to doctor
- `hospital_id`: Reference to hospital/clinic
- `prescription_number`: Unique identifier
- `medications`: Array of detailed medication objects
  - `name`: Medication name
  - `dosage`: Dosage information
  - `frequency`: How often to take
  - `duration`: Length of treatment
  - `instructions`: Special instructions
- `lab_tests`: Array of recommended tests
- `follow_up_date`: Date for next visit
- `notes`: Doctor's notes
- `created_at`: Timestamp
- `updated_at`: Timestamp
- `expires_at`: Prescription expiry date

---

### 3. Appointment Model

**Frontend Needs:**
```typescript
interface Appointment {
  doctor_id: string;
  patient_id: string;
  date: string;              // Appointment date
  time_slot: string;         // Time slot
  type: string;              // "in-person" | "video"
  status: string;            // "scheduled" | "completed" | "cancelled"
}
```

**Backend Requirements:**
- Real-time availability checking
- Booking creation and cancellation
- Conflict prevention
- Notifications for appointments

**Additional Fields Needed:**
- `id`: UUID or ObjectId
- `booking_number`: Unique booking reference
- `reason`: Reason for visit
- `symptoms`: Patient-provided symptoms
- `video_link`: For video consultations
- `reminder_sent`: Boolean
- `created_at`: Timestamp
- `updated_at`: Timestamp

---

### 4. Patient Model

**Backend Requirements:**
- User registration and profile management
- Medical history storage
- Prescription history association
- Appointment history

**Fields Needed:**
- `id`: UUID or ObjectId
- `email`: Unique email address
- `password_hash`: Encrypted password
- `name`: Full name
- `phone`: Contact number
- `date_of_birth`: DOB
- `gender`: Gender
- `blood_group`: Blood type
- `allergies`: Array of allergies
- `chronic_conditions`: Array of conditions
- `emergency_contact`: Object with name and phone
- `address`: Full address
- `profile_image`: Image URL
- `created_at`: Timestamp
- `updated_at`: Timestamp

---

### 5. Hospital/Clinic Model

**Frontend Needs:**
```typescript
interface Hospital {
  name: string;              // Hospital name
  address: string;           // Location
  doctors: string[];         // Associated doctors
}
```

**Backend Requirements:**
- Hospital registration
- Doctor association
- Location-based search

**Additional Fields Needed:**
- `id`: UUID or ObjectId
- `registration_number`: Unique identifier
- `email`: Contact email
- `phone`: Contact number
- `website`: Website URL
- `facilities`: Array of available facilities
- `emergency_services`: Boolean
- `coordinates`: { latitude, longitude }
- `operating_hours`: Schedule object
- `created_at`: Timestamp
- `updated_at`: Timestamp

---

### 6. Contact Form Submission Model

**Frontend Form Data:**
```typescript
interface ContactForm {
  name: string;
  email: string;
  organization: string;      // Optional
  message: string;
  type: string;              // "general" | "hospital" | "support"
}
```

**Backend Requirements:**
- Form submission endpoint
- Email notification system
- Admin dashboard for viewing submissions

**Additional Fields Needed:**
- `id`: UUID or ObjectId
- `status`: "new" | "in-progress" | "resolved"
- `assigned_to`: Admin user ID (optional)
- `response`: Admin response text
- `created_at`: Timestamp
- `responded_at`: Timestamp (optional)

---

### 7. Medical Record Model

**Backend Requirements:**
- Centralized medical profile
- Auto-updating from consultations
- Chronological timeline

**Fields Needed:**
- `id`: UUID or ObjectId
- `patient_id`: Reference to patient
- `record_type`: "consultation" | "lab_report" | "prescription" | "scan"
- `date`: Record date
- `doctor_id`: Reference to doctor
- `hospital_id`: Reference to hospital
- `title`: Record title
- `description`: Details
- `attachments`: Array of file URLs
- `created_at`: Timestamp

---

## API Endpoints Required

### Doctor Endpoints

```
GET    /api/doctors                    - List all doctors (with pagination & filters)
GET    /api/doctors/:id                - Get doctor details
POST   /api/doctors                    - Create new doctor (admin)
PUT    /api/doctors/:id                - Update doctor (admin)
DELETE /api/doctors/:id                - Delete doctor (admin)
GET    /api/doctors/search             - Search doctors with filters
```

**Query Parameters for Search:**
- `location`: Filter by location/city
- `specialization`: Filter by specialization
- `rating_min`: Minimum rating filter
- `experience_min`: Minimum years of experience
- `available`: Boolean for current availability
- `page`: Pagination page number
- `limit`: Results per page

---

### Appointment Endpoints

```
GET    /api/appointments                - Get user's appointments
GET    /api/appointments/:id            - Get appointment details
POST   /api/appointments                - Create new appointment
PUT    /api/appointments/:id            - Update appointment
DELETE /api/appointments/:id            - Cancel appointment
GET    /api/doctors/:id/availability    - Get doctor's available slots
```

**Request Body for Creating Appointment:**
```json
{
  "doctor_id": "string",
  "date": "2024-12-20",
  "time_slot": "10:00 AM - 10:30 AM",
  "type": "in-person",
  "reason": "string",
  "symptoms": "string"
}
```

---

### Prescription Endpoints

```
GET    /api/prescriptions               - Get user's prescriptions
GET    /api/prescriptions/:id           - Get prescription details
POST   /api/prescriptions               - Create prescription (doctor)
PUT    /api/prescriptions/:id           - Update prescription (doctor)
GET    /api/patients/:id/prescriptions  - Get patient's prescription history
```

---

### Patient/User Endpoints

```
POST   /api/auth/register               - Patient registration
POST   /api/auth/login                  - Patient login
POST   /api/auth/logout                 - Logout
GET    /api/auth/me                     - Get current user
PUT    /api/auth/profile                - Update profile
GET    /api/patients/:id/medical-history - Get complete medical history
```

**Registration Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "phone": "string",
  "date_of_birth": "1990-01-01"
}
```

---

### Contact Form Endpoint

```
POST   /api/contact                     - Submit contact form
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "organization": "string",
  "message": "string",
  "type": "general"
}
```

---

### Hospital Endpoints

```
GET    /api/hospitals                   - List all hospitals
GET    /api/hospitals/:id               - Get hospital details
GET    /api/hospitals/:id/doctors       - Get hospital's doctors
```

---

## Authentication & Authorization

### Required Features:
1. **JWT-based authentication**
   - Access tokens (short-lived, 15-30 min)
   - Refresh tokens (long-lived, 7-30 days)

2. **User Roles:**
   - `patient`: Regular users
   - `doctor`: Healthcare providers
   - `admin`: Platform administrators
   - `hospital_admin`: Hospital managers

3. **Protected Routes:**
   - Appointment booking requires authentication
   - Prescription access requires authentication
   - Medical history is user-specific

4. **Security Requirements:**
   - Password hashing (bcrypt)
   - HTTPS only
   - HIPAA compliance
   - 256-bit encryption for sensitive data

---

## Search & Filter Requirements

### Doctor Search Features:

1. **Text Search:**
   - Search by doctor name
   - Search by specialization
   - Search by hospital name
   - Fuzzy matching support

2. **Filters:**
   - **Location:** City/area-based filtering
   - **Specialization:** Dropdown selection
   - **Rating:** Minimum rating (4.0+, 4.5+, 4.8+)
   - **Experience:** Years (5+, 10+, 15+)
   - **Availability:** Available today, this week
   - **Gender:** Optional gender filter

3. **Sorting:**
   - By rating (high to low)
   - By experience (high to low)
   - By availability
   - By distance (if geolocation enabled)

4. **Pagination:**
   - Default: 10-20 results per page
   - Total count in response
   - Page navigation

---

## Real-time Features

### Features Requiring Real-time Updates:

1. **Doctor Availability:**
   - Real-time slot updates when booked
   - Live availability status

2. **Appointment Notifications:**
   - Booking confirmations
   - Reminder notifications (1 day, 1 hour before)
   - Cancellation notifications

3. **Prescription Updates:**
   - Instant sync across systems
   - Pharmacy notification when prescribed

**Implementation Suggestions:**
- WebSockets for real-time updates
- Server-Sent Events (SSE) for notifications
- Polling as fallback

---

## Third-party Integrations

### Required Integrations:

1. **Email Service:**
   - Appointment confirmations
   - Prescription notifications
   - Contact form responses
   - Password reset emails
   - **Suggested:** SendGrid, AWS SES, Mailgun

2. **SMS Service:**
   - Appointment reminders
   - OTP verification
   - **Suggested:** Twilio, AWS SNS

3. **File Storage:**
   - Profile images
   - Medical records/reports
   - Prescription attachments
   - **Suggested:** AWS S3, Cloudinary

4. **Payment Gateway (Future):**
   - Consultation fee payment
   - **Suggested:** Stripe, Razorpay

5. **Video Conferencing (Future):**
   - Video consultations
   - **Suggested:** Agora, Twilio Video, Daily.co

---

## Response Formats

### Standard Success Response:
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Standard Error Response:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { /* additional error info */ }
  }
}
```

### Paginated Response:
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_items": 95,
    "items_per_page": 10,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## Frontend Components Reference

### Key Components Using Backend Data:

1. **SearchBar Component**
   - Input: `location`, `specialization`
   - Action: Calls doctor search API
   - Requires: GET `/api/doctors/search`

2. **DoctorCard Component**
   - Displays: Doctor details
   - Action: "Quick Book" button → appointment creation
   - Requires: Doctor model data

3. **Contact Form**
   - Submits to: POST `/api/contact`
   - Fields: name, email, organization, message, type

4. **Prescription List**
   - Displays: User's prescription history
   - Requires: GET `/api/prescriptions`

---

## Environment Variables Needed

Backend should support the following configuration:

```env
# Database
DATABASE_URL=
DATABASE_NAME=

# JWT
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRE_TIME=
JWT_REFRESH_EXPIRE_TIME=

# Email Service
EMAIL_SERVICE_API_KEY=
EMAIL_FROM_ADDRESS=

# SMS Service
SMS_SERVICE_API_KEY=
SMS_FROM_NUMBER=

# File Storage
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Server
PORT=3000
NODE_ENV=development
```

---

## Data Validation Rules

### Doctor:
- `name`: Required, min 2 chars, max 100 chars
- `specialization`: Required, from predefined list
- `experience`: Required, number, min 0, max 60
- `rating`: Number, min 0, max 5
- `email`: Valid email format
- `phone`: Valid phone number format

### Patient:
- `email`: Required, unique, valid email
- `password`: Min 8 chars, must include uppercase, lowercase, number
- `name`: Required, min 2 chars, max 100 chars
- `phone`: Required, valid format
- `date_of_birth`: Valid date, age >= 0

### Appointment:
- `doctor_id`: Required, must exist
- `date`: Required, must be future date
- `time_slot`: Required, must be available
- `type`: Required, enum: ["in-person", "video"]

### Prescription:
- `patient_id`: Required, must exist
- `doctor_id`: Required, must exist
- `diagnosis`: Required, min 5 chars
- `medications`: Required, array with at least 1 item

---

## Performance Requirements

1. **Response Times:**
   - Doctor search: < 500ms
   - Appointment creation: < 1s
   - User profile retrieval: < 300ms

2. **Concurrent Users:**
   - Support at least 1000 concurrent users
   - Database connection pooling

3. **Caching Strategy:**
   - Cache doctor listings (TTL: 5 minutes)
   - Cache hospital data (TTL: 1 hour)
   - Cache static content (TTL: 24 hours)

4. **Database Indexing:**
   - Index on doctor.specialization
   - Index on doctor.location
   - Index on patient.email
   - Compound index on (location, specialization)

---

## Security Checklist

- [ ] Implement rate limiting (max 100 req/min per IP)
- [ ] Input sanitization and validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Helmet.js for security headers
- [ ] CORS configuration
- [ ] Password hashing with bcrypt (10+ rounds)
- [ ] Secure session management
- [ ] HTTPS only in production
- [ ] HIPAA compliance logging
- [ ] Data encryption at rest
- [ ] Regular security audits

---

## Testing Requirements

### Unit Tests Needed:
- Authentication logic
- Data validation functions
- Business logic (availability checking, rating calculation)

### Integration Tests:
- API endpoint responses
- Database operations
- Third-party service integrations

### End-to-End Tests:
- Complete user flows (registration → search → booking)
- Prescription creation and retrieval

---

## Future Enhancements (Not Immediate)

These features are visible in the frontend but can be implemented later:

1. **Video Consultations:** Full video calling integration
2. **Payment Processing:** Online payment for consultations
3. **Lab Test Booking:** Integration with diagnostic centers
4. **Pharmacy Integration:** Direct prescription to pharmacy
5. **Health Insurance:** Insurance claim processing
6. **Multi-language Support:** i18n for regional languages
7. **Mobile Apps:** iOS/Android native apps
8. **AI Symptom Checker:** ML-based symptom analysis
9. **Telemedicine Features:** Remote patient monitoring

---

## Documentation Standards

All API endpoints should be documented using:
- **Swagger/OpenAPI** specification
- Request/response examples
- Error codes and messages
- Authentication requirements
- Rate limiting information

---

**Document Version:** 1.0  
**Last Updated:** December 17, 2025  
**Contact:** Backend Development Team
