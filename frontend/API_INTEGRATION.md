# Frontend API Integration

This directory contains the complete API integration setup for connecting the MedSync frontend to the backend.

## Structure

```
src/
├── lib/
│   └── api.ts                 # Base API client with fetch wrapper
├── types/
│   └── api.ts                 # TypeScript interfaces for all data models
├── services/
│   ├── authService.ts         # Authentication & session management
│   ├── doctorService.ts       # Doctor-related API calls
│   ├── appointmentService.ts  # Appointment booking & management
│   ├── prescriptionService.ts # Digital prescription management
│   ├── reviewService.ts       # Doctor reviews & ratings
│   ├── userService.ts         # User profile management
│   └── index.ts               # Central service exports
├── hooks/
│   └── useApi.ts              # Custom React hooks for API calls
└── contexts/
    └── AuthContext.tsx        # Authentication context provider
```

## Setup

### 1. Environment Variables

The `.env` file has been created with:
```
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

### 2. API Client (`lib/api.ts`)

Features:
- Automatic JWT token management
- Request/response interceptors
- Error handling with automatic retry for 401s
- Support for GET, POST, PUT, PATCH, DELETE
- File upload support with FormData
- TypeScript support

### 3. Services

#### Auth Service
```typescript
import { authService } from '@/services';

// Login
await authService.login({ email, password });

// Register
await authService.register({ firstName, lastName, email, password, phone });

// Logout
await authService.logout();

// Get current user
const user = await authService.getCurrentUser();
```

#### Doctor Service
```typescript
import { doctorService } from '@/services';

// Get all doctors with filters
const doctors = await doctorService.getAllDoctors({
  specialization: 'Cardiologist',
  city: 'Mumbai',
  minRating: 4,
  page: 1,
  limit: 10
});

// Search doctors
const results = await doctorService.searchDoctors('Dr. Smith');

// Get doctor by ID
const doctor = await doctorService.getDoctorById(doctorId);
```

#### Appointment Service
```typescript
import { appointmentService } from '@/services';

// Book appointment
const appointment = await appointmentService.bookAppointment({
  doctor: doctorId,
  appointmentDate: '2025-01-15',
  timeSlot: { startTime: '10:00', endTime: '10:30' },
  reason: 'Regular checkup',
  type: 'in-person'
});

// Get appointments
const appointments = await appointmentService.getAllAppointments({
  status: 'scheduled'
});

// Cancel appointment
await appointmentService.cancelAppointment(appointmentId, 'Reason for cancellation');
```

#### Prescription Service
```typescript
import { prescriptionService } from '@/services';

// Get prescriptions
const prescriptions = await prescriptionService.getAllPrescriptions();

// Get prescription by ID
const prescription = await prescriptionService.getPrescriptionById(id);

// Download prescription PDF
const blob = await prescriptionService.downloadPrescription(id);
```

### 4. Custom Hooks

#### useApi Hook
```typescript
import { useApi } from '@/hooks/useApi';
import { doctorService } from '@/services';

function DoctorsList() {
  const { data, loading, error } = useApi(
    () => doctorService.getAllDoctors(),
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render doctors */}</div>;
}
```

#### useApiMutation Hook
```typescript
import { useApiMutation } from '@/hooks/useApi';
import { appointmentService } from '@/services';

function BookAppointment() {
  const { mutate, loading, error } = useApiMutation();

  const handleSubmit = async (data) => {
    try {
      await mutate(appointmentService.bookAppointment, data);
      alert('Appointment booked!');
    } catch (err) {
      console.error('Failed to book:', err);
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

#### usePaginatedApi Hook
```typescript
import { usePaginatedApi } from '@/hooks/useApi';
import { doctorService } from '@/services';

function DoctorsListPaginated() {
  const {
    data,
    loading,
    pagination,
    nextPage,
    prevPage,
    goToPage
  } = usePaginatedApi(
    (page, limit) => doctorService.getAllDoctors({ page, limit }),
    1,
    10
  );

  return (
    <div>
      {/* Render doctors */}
      <Pagination
        current={pagination.page}
        total={pagination.totalPages}
        onNext={nextPage}
        onPrev={prevPage}
        onPageChange={goToPage}
      />
    </div>
  );
}
```

### 5. Authentication Context

Wrap your app with the AuthProvider:

```typescript
// main.tsx or App.tsx
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

Use authentication in components:

```typescript
import { useAuth } from '@/contexts/AuthContext';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Link to="/login">Login</Link>;
  }

  return (
    <div>
      <span>Welcome, {user?.firstName}!</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Usage Examples

### Login Page
```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Find Doctors Page
```typescript
import { useState, useEffect } from 'react';
import { doctorService } from '@/services';
import type { Doctor } from '@/types/api';

function FindDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    specialization: '',
    city: '',
    minRating: 0
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const result = await doctorService.getAllDoctors(filters);
        setDoctors(result.data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [filters]);

  return (
    <div>
      {/* Filter controls */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {doctors.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Next Steps

1. **Add AuthProvider** to your app's root component
2. **Create login/register pages** using the auth service
3. **Implement protected routes** that check authentication
4. **Build doctor listing page** with filters
5. **Create appointment booking flow**
6. **Add prescription viewing**

## API Endpoints Available

All backend endpoints are now accessible through the services:

- **Auth**: `/api/auth/*` (login, register, logout, etc.)
- **Users**: `/api/users/*` (profile, update, avatar)
- **Doctors**: `/api/doctors/*` (list, search, create, update)
- **Appointments**: `/api/appointments/*` (book, list, cancel, reschedule)
- **Prescriptions**: `/api/prescriptions/*` (create, view, download)
- **Reviews**: `/api/reviews/*` (create, update, delete)

## Error Handling

All API calls automatically handle errors and return consistent error messages. 401 errors will automatically redirect to login.

```typescript
try {
  await doctorService.getDoctorById(id);
} catch (error) {
  // error.error contains the error message
  // error.status contains the HTTP status code
  console.error(error.error);
}
```

## TypeScript Support

All services and hooks are fully typed. Import types from `@/types/api`:

```typescript
import type { 
  User, 
  Doctor, 
  Appointment, 
  Prescription,
  Review 
} from '@/types/api';
```
