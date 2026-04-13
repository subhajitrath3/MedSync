/**
 * TypeScript interfaces for API data models
 */

// User & Authentication Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  fullName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role?: 'patient' | 'doctor';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Doctor Types
export interface Doctor {
  _id: string;
  user: User | string;
  specialization: string;
  qualifications: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
  experience: number;
  licenseNumber: string;
  bio?: string;
  consultationFee: number;
  hospital?: string;
  clinicAddress?: {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  availability: Array<{
    day: string;
    slots: Array<{
      startTime: string;
      endTime: string;
      isBooked: boolean;
    }>;
  }>;
  languages: string[];
  rating: {
    average: number;
    count: number;
  };
  totalPatients: number;
  isVerified: boolean;
  isAcceptingPatients: boolean;
  awards?: Array<{
    title: string;
    year: number;
  }>;
  certifications?: Array<{
    name: string;
    issuedBy: string;
    year: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorFilters {
  specialization?: string;
  city?: string;
  minRating?: number;
  minExperience?: number;
  maxFee?: number;
  isAcceptingPatients?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

// Appointment Types
export interface Appointment {
  _id: string;
  patient: User | string;
  doctor: Doctor | string;
  appointmentDate: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type: 'in-person' | 'video' | 'phone';
  reason: string;
  symptoms?: string[];
  prescription?: string;
  notes?: string;
  fee: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: 'cash' | 'card' | 'insurance' | 'online';
  cancellationReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentData {
  doctor: string;
  appointmentDate: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  type?: 'in-person' | 'video' | 'phone';
  reason: string;
  symptoms?: string[];
}

export interface AppointmentFilters {
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// Prescription Types
export interface Prescription {
  _id: string;
  appointment: string;
  patient: User | string;
  doctor: Doctor | string;
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }>;
  tests?: Array<{
    name: string;
    notes?: string;
  }>;
  advice?: string;
  followUpDate?: string;
  prescriptionDate: string;
  validUntil?: string;
  digitalSignature?: string;
  isActive: boolean;
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePrescriptionData {
  appointment: string;
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }>;
  tests?: Array<{
    name: string;
    notes?: string;
  }>;
  advice?: string;
  followUpDate?: string;
}

// Review Types
export interface Review {
  _id: string;
  doctor: string;
  patient: User | string;
  appointment: string;
  rating: number;
  comment?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  doctor: string;
  appointment: string;
  rating: number;
  comment?: string;
}

// Hospital Types
export interface Hospital {
  _id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'diagnostic-center' | 'pharmacy';
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  facilities?: string[];
  departments?: string[];
  emergencyServices: boolean;
  operatingHours?: {
    weekdays?: {
      open: string;
      close: string;
    };
    weekends?: {
      open: string;
      close: string;
    };
    is24x7: boolean;
  };
  doctors?: string[];
  rating: {
    average: number;
    count: number;
  };
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
