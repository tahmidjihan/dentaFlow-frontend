/**
 * Clinics API Calls
 * All API endpoints related to clinics
 */

import { get, post, put, del } from '../lib/fetchAPI';
import type { Clinic } from '@/types/database';

export interface CreateClinicInput {
  name: string;
  email: string;
  phone: string;
  location: string;
  status?: 'open' | 'closed';
}

export interface UpdateClinicInput extends Partial<CreateClinicInput> {}

/**
 * Get all clinics
 */
export const getClinics = () => get<Clinic[]>('/api/clinics');

/**
 * Get clinic by ID
 */
export const getClinicById = (id: string) => get<Clinic>(`/api/clinics/${id}`);

/**
 * Create a new clinic (Admin only)
 */
export const createClinic = (data: CreateClinicInput) =>
  post<Clinic>('/api/clinics', data);

/**
 * Update a clinic (Admin only)
 */
export const updateClinic = (id: string, data: UpdateClinicInput) =>
  put<Clinic>(`/api/clinics/${id}`, data);

/**
 * Delete a clinic (Admin only)
 */
export const deleteClinic = (id: string) =>
  del<void>(`/api/clinics/${id}`);
