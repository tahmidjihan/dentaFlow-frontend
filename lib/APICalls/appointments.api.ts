/**
 * Appointments API Calls
 * All API endpoints related to appointments
 */

import { get, post, put, del } from '../fetchAPI';
import type { Appointment, AppointStatus } from '@/types/database';

export interface CreateAppointmentInput {
  userId: string;
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
 * Get current user's appointments (patient view) (Protected)
 */
export const getMyAppointments = () => get<Appointment[]>('/api/appointments/my');

/**
 * Get doctor's appointments by doctor ID (Protected)
 */
export const getDoctorAppointments = (doctorId: string) =>
  get<Appointment[]>(`/api/appointments/doctor/${doctorId}`);

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
 * Update appointment status (Protected)
 */
export const updateAppointmentStatus = (id: string, status: AppointStatus) =>
  put<Appointment>(`/api/appointments/${id}/status`, { status });

/**
 * Delete an appointment (Protected)
 */
export const deleteAppointment = (id: string) =>
  del<void>(`/api/appointments/${id}`);
