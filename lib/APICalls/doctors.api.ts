/**
 * Doctors API Calls
 * All API endpoints related to doctors
 */

import { get, post, put, del } from '../fetchAPI';
import type { User } from '@/types/database';

export interface UpdateDoctorInput {
  name?: string;
  email?: string;
  clinicId?: string | null;
}

/**
 * Get all doctors
 */
export const getDoctors = () => get<User[]>('/api/doctors');

/**
 * Get doctor by ID
 */
export const getDoctorById = (id: string) => get<User>(`/api/doctors/${id}`);

/**
 * Update a doctor (Admin only)
 */
export const updateDoctor = (id: string, data: UpdateDoctorInput) =>
  put<User>(`/api/doctors/${id}`, data);

/**
 * Delete a doctor (Admin only)
 */
export const deleteDoctor = (id: string) => del<void>(`/api/doctors/${id}`);

/**
 * Assign doctor to clinic (Admin only)
 */
export const assignDoctorToClinic = (doctorId: string, clinicId: string) =>
  post<User>(`/api/doctors/${doctorId}/clinic`, { clinicId });
