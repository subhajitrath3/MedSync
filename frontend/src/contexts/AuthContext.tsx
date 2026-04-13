/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, LoginCredentials, RegisterData } from '../types/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const initAuth = async () => {
      try {
        const storedUser = authService.getStoredUser();
        console.log('InitAuth - Stored user:', storedUser);
        
        if (storedUser && authService.isAuthenticated()) {
          // Use stored user data immediately for faster load
          console.log('Setting user from storage:', storedUser);
          setUser(storedUser);
          
          // Try to verify and refresh user data in background
          try {
            const currentUser = await authService.getCurrentUser();
            console.log('Setting refreshed user:', currentUser);
            setUser(currentUser);
            // Update localStorage with fresh data
            localStorage.setItem('user', JSON.stringify(currentUser));
          } catch (error) {
            // If verification fails, keep using stored user data
            // Only logout if there's a critical auth error
            console.warn('Could not verify user session, using cached data');
          }
        } else {
          console.log('No stored user or not authenticated');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
  };

  const register = async (data: RegisterData) => {
    const response = await authService.register(data);
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    // Persist updated user data to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
