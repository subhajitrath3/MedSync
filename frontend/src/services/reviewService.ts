/**
 * Review Service
 * Handles doctor reviews and ratings
 */

import { api } from '../lib/api';
import type { Review, CreateReviewData } from '../types/api';

export const reviewService = {
  /**
   * Create a new review
   */
  async createReview(data: CreateReviewData): Promise<Review> {
    const response = await api.post<Review>('/reviews', data);
    return response.data!;
  },

  /**
   * Get reviews for a specific doctor
   */
  async getDoctorReviews(doctorId: string): Promise<Review[]> {
    const response = await api.get<Review[]>(`/reviews/doctor/${doctorId}`);
    return response.data!;
  },

  /**
   * Update a review
   */
  async updateReview(reviewId: string, data: Partial<CreateReviewData>): Promise<Review> {
    const response = await api.put<Review>(`/reviews/${reviewId}`, data);
    return response.data!;
  },

  /**
   * Delete a review
   */
  async deleteReview(reviewId: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/reviews/${reviewId}`);
    return response.data!;
  },
};
