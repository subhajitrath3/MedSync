/**
 * Doctor Service
 * Handles doctor-related API calls
 */

import { api } from '../lib/api';
import type { Doctor, DoctorFilters, PaginatedResponse } from '../types/api';

export const doctorService = {
  /**
   * Get all doctors with optional filters
   */
  async getAllDoctors(filters?: DoctorFilters): Promise<PaginatedResponse<Doctor>> {
    const response = await api.get<PaginatedResponse<Doctor>>('/doctors', filters);
    return response.data!;
  },

  /**
   * Get single doctor by ID
   */
  async getDoctorById(id: string): Promise<Doctor> {
    const response = await api.get<Doctor>(`/doctors/${id}`);
    return response.data!;
  },

  /**
   * Search doctors by name, specialization, etc.
   */
  async searchDoctors(query: string, filters?: DoctorFilters): Promise<PaginatedResponse<Doctor>> {
    const response = await api.get<PaginatedResponse<Doctor>>('/doctors/search', {
      q: query,
      ...filters,
    });
    return response.data!;
  },

  /**
   * Get doctors by specialization
   */
  async getDoctorsBySpecialization(specialization: string, filters?: DoctorFilters): Promise<PaginatedResponse<Doctor>> {
    const response = await api.get<PaginatedResponse<Doctor>>(`/doctors/specialization/${specialization}`, filters);
    return response.data!;
  },

  /**
   * Get doctor's availability
   */
  async getDoctorAvailability(doctorId: string): Promise<Doctor['availability']> {
    const response = await api.get<Doctor['availability']>(`/doctors/${doctorId}/availability`);
    return response.data!;
  },

  /**
   * Create doctor profile (admin/doctor only)
   */
  async createDoctor(data: Partial<Doctor>): Promise<Doctor> {
    const response = await api.post<Doctor>('/doctors', data);
    return response.data!;
  },

  /**
   * Update doctor profile
   */
  async updateDoctor(id: string, data: Partial<Doctor>): Promise<Doctor> {
    const response = await api.put<Doctor>(`/doctors/${id}`, data);
    return response.data!;
  },

  /**
   * Update doctor availability
   */
  async updateAvailability(doctorId: string, availability: Doctor['availability']): Promise<Doctor> {
    const response = await api.put<Doctor>(`/doctors/${doctorId}/availability`, {
      availability,
    });
    return response.data!;
  },

  /**
   * Delete doctor profile (admin only)
   */
  async deleteDoctor(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/doctors/${id}`);
    return response.data!;
  },

  /**
   * Get doctor reviews
   */
  async getDoctorReviews(doctorId: string): Promise<any[]> {
    const response = await api.get<any[]>(`/doctors/${doctorId}/reviews`);
    return response.data!;
  },

  /**
   * Get available specializations
   */
  getSpecializations(): string[] {
    return [
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
      'Other',
    ];
  },
};
