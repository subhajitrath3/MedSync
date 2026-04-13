/**
 * User Service
 * Handles user profile management
 */

import { api } from '../lib/api';
import type { User } from '../types/api';

export const userService = {
  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/users/profile');
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    
    throw new Error('Failed to fetch profile');
  },

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>('/users/profile', data);
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    
    throw new Error('Failed to update profile');
  },

  /**
   * Upload avatar
   */
  async uploadAvatar(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.upload<User>('/users/avatar', formData);
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    
    throw new Error('Failed to upload avatar');
  },

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>('/users/account');
    
    if (response.success) {
      // Clear all user data
      localStorage.clear();
    }
    
    return response.data!;
  },
};
