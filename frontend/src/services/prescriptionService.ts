/**
 * Prescription Service
 * Handles digital prescription management
 */

import { api } from '../lib/api';
import type { 
  Prescription, 
  CreatePrescriptionData,
  PaginatedResponse 
} from '../types/api';

export const prescriptionService = {
  /**
   * Get all prescriptions (filtered by current user)
   */
  async getAllPrescriptions(filters?: any): Promise<PaginatedResponse<Prescription>> {
    const response = await api.get<PaginatedResponse<Prescription>>('/prescriptions', filters);
    return response.data!;
  },

  /**
   * Get single prescription by ID
   */
  async getPrescriptionById(id: string): Promise<Prescription> {
    const response = await api.get<Prescription>(`/prescriptions/${id}`);
    return response.data!;
  },

  /**
   * Create new prescription (doctor only)
   */
  async createPrescription(data: CreatePrescriptionData): Promise<Prescription> {
    const response = await api.post<Prescription>('/prescriptions', data);
    return response.data!;
  },

  /**
   * Update prescription
   */
  async updatePrescription(id: string, data: Partial<Prescription>): Promise<Prescription> {
    const response = await api.put<Prescription>(`/prescriptions/${id}`, data);
    return response.data!;
  },

  /**
   * Delete prescription
   */
  async deletePrescription(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/prescriptions/${id}`);
    return response.data!;
  },

  /**
   * Get patient's prescriptions
   */
  async getPatientPrescriptions(patientId: string): Promise<PaginatedResponse<Prescription>> {
    const response = await api.get<PaginatedResponse<Prescription>>(`/prescriptions/patient/${patientId}`);
    return response.data!;
  },

  /**
   * Get prescription by appointment ID
   */
  async getPrescriptionByAppointment(appointmentId: string): Promise<Prescription> {
    const response = await api.get<Prescription>(`/prescriptions/appointment/${appointmentId}`);
    return response.data!;
  },

  /**
   * Download prescription as PDF
   */
  async downloadPrescription(id: string): Promise<Blob> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/prescriptions/${id}/download`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download prescription');
    }

    return await response.blob();
  },
};
