/**
 * Appointments API Calls
 * All API endpoints related to appointments
 */

import { get, post, put, del } from '../fetchAPI';
import type { Appointment, AppointStatus } from '@/types/database';

export interface CreateAppointmentInput {
  doctorId: string;
  clinicId: string;
  date: string | Date;
  status?: AppointStatus;
}

export interface UpdateAppointmentInput {
  status?: AppointStatus;
  date?: string | Date;
}

/**
 * Get all appointments (Protected)
 */
export const getAppointments = () => get<Appointment[]>('/api/appointments');

/**
 * Get appointment by ID (Protected)
 */
export const getAppointmentById = (id: string) =>
  get<Appointment>(`/api/appointments/${id}`);

/**
 * Create a new appointment (Protected)
 */
export const createAppointment = (data: CreateAppointmentInput) =>
  post<Appointment>('/api/appointments', data);

/**
 * Update an appointment (Protected)
 */
export const updateAppointment = (id: string, data: UpdateAppointmentInput) =>
  put<Appointment>(`/api/appointments/${id}`, data);

/**
 * Delete an appointment (Protected)
 */
export const deleteAppointment = (id: string) =>
  del<void>(`/api/appointments/${id}`);
