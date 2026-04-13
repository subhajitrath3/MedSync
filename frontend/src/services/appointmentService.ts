/**
 * Appointment Service
 * Handles appointment booking and management
 */

import { api } from '../lib/api';
import type { 
  Appointment, 
  CreateAppointmentData, 
  AppointmentFilters,
  PaginatedResponse 
} from '../types/api';

export const appointmentService = {
  /**
   * Get all appointments (filtered by current user)
   */
  async getAllAppointments(filters?: AppointmentFilters): Promise<PaginatedResponse<Appointment>> {
    const response = await api.get<PaginatedResponse<Appointment>>('/appointments', filters);
    return response.data!;
  },

  /**
   * Get single appointment by ID
   */
  async getAppointmentById(id: string): Promise<Appointment> {
    const response = await api.get<Appointment>(`/appointments/${id}`);
    return response.data!;
  },

  /**
   * Book new appointment
   */
  async bookAppointment(data: CreateAppointmentData): Promise<Appointment> {
    const response = await api.post<Appointment>('/appointments', data);
    return response.data!;
  },

  /**
   * Update appointment
   */
  async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
    const response = await api.put<Appointment>(`/appointments/${id}`, data);
    return response.data!;
  },

  /**
   * Cancel appointment
   */
  async cancelAppointment(id: string, reason?: string): Promise<Appointment> {
    const response = await api.delete<Appointment>(`/appointments/${id}`, 
      reason ? { cancellationReason: reason } : undefined
    );
    return response.data!;
  },

  /**
   * Get patient's appointments
   */
  async getPatientAppointments(patientId: string, filters?: AppointmentFilters): Promise<PaginatedResponse<Appointment>> {
    const response = await api.get<PaginatedResponse<Appointment>>(`/appointments/patient/${patientId}`, filters);
    return response.data!;
  },

  /**
   * Get doctor's appointments
   */
  async getDoctorAppointments(doctorId: string, filters?: AppointmentFilters): Promise<PaginatedResponse<Appointment>> {
    const response = await api.get<PaginatedResponse<Appointment>>(`/appointments/doctor/${doctorId}`, filters);
    return response.data!;
  },

  /**
   * Update appointment status
   */
  async updateAppointmentStatus(
    id: string, 
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  ): Promise<Appointment> {
    const response = await api.put<Appointment>(`/appointments/${id}/status`, {
      status,
    });
    return response.data!;
  },

  /**
   * Reschedule appointment
   */
  async rescheduleAppointment(
    id: string, 
    newDate: string, 
    newTimeSlot: { startTime: string; endTime: string }
  ): Promise<Appointment> {
    const response = await api.put<Appointment>(`/appointments/${id}/reschedule`, {
      appointmentDate: newDate,
      timeSlot: newTimeSlot,
    });
    return response.data!;
  },

  /**
   * Get appointment types
   */
  getAppointmentTypes(): Array<{ value: string; label: string }> {
    return [
      { value: 'in-person', label: 'In-Person' },
      { value: 'video', label: 'Video Consultation' },
      { value: 'phone', label: 'Phone Consultation' },
    ];
  },

  /**
   * Get appointment statuses
   */
  getAppointmentStatuses(): Array<{ value: string; label: string }> {
    return [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'no-show', label: 'No Show' },
    ];
  },
};
