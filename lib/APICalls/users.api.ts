/**
 * Users API Calls
 * All API endpoints related to users
 */

import { get, post, put, del } from '../lib/fetchAPI';
import type { User, Role } from '@/types/database';

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: Role;
  clinicId?: string | null;
}

/**
 * Get all users
 */
export const getUsers = () => get<User[]>('/api/users');

/**
 * Get user by ID
 */
export const getUserById = (id: string) => get<User>(`/api/users/${id}`);

/**
 * Update a user (Admin only)
 */
export const updateUser = (id: string, data: UpdateUserInput) =>
  put<User>(`/api/users/${id}`, data);

/**
 * Delete a user (Admin only)
 */
export const deleteUser = (id: string) => del<void>(`/api/users/${id}`);

/**
 * Assign user to clinic (Admin only)
 */
export const assignUserToClinic = (userId: string, clinicId: string) =>
  post<User>(`/api/users/${userId}/clinic`, { clinicId });
