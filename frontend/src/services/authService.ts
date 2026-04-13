/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import { api } from '../lib/api';
import type { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from '../types/api';

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    
    if (response.success && response.data) {
      console.log('Register response user:', response.data.user);
      // Store tokens
      api.setToken(response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('User saved to localStorage:', localStorage.getItem('user'));
    }
    
    return response.data!;
  },

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      console.log('Login response user:', response.data.user);
      // Store tokens
      api.setToken(response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('User saved to localStorage:', localStorage.getItem('user'));
    }
    
    return response.data!;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear tokens and user data
      api.removeToken();
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    
    if (response.success && response.data) {
      console.log('getCurrentUser response:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    
    throw new Error('Failed to fetch user profile');
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post<{ accessToken: string }>('/auth/refresh-token', {
      refreshToken,
    });
    
    if (response.success && response.data) {
      api.setToken(response.data.accessToken);
      return response.data;
    }
    
    throw new Error('Failed to refresh token');
  },

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/forgot-password', {
      email,
    });
    
    return response.data!;
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/auth/reset-password/${token}`, {
      password: newPassword,
    });
    
    return response.data!;
  },

  /**
   * Change password (authenticated user)
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.put<{ message: string }>('/users/change-password', {
      currentPassword,
      newPassword,
    });
    
    return response.data!;
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/auth/verify-email/${token}`);
    
    return response.data!;
  },

  /**
   * Get stored user from localStorage
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('Retrieved user from localStorage:', user);
        return user;
      } catch {
        console.error('Failed to parse user from localStorage');
        return null;
      }
    }
    console.log('No user found in localStorage');
    return null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  },

  /**
   * Get user role
   */
  getUserRole(): 'patient' | 'doctor' | 'admin' | null {
    const user = this.getStoredUser();
    return user?.role || null;
  },
};
