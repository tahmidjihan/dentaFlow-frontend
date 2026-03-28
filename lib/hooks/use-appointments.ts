'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as appointmentsApi from '@/lib/APICalls/appointments.api';
import type { CreateAppointmentInput, UpdateAppointmentInput } from '@/lib/APICalls/appointments.api';

/**
 * Get all appointments (Protected)
 */
export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentsApi.getAppointments,
  });
}

/**
 * Get appointment by ID (Protected)
 */
export function useAppointment(appointmentId: string) {
  return useQuery({
    queryKey: ['appointments', appointmentId],
    queryFn: () => appointmentsApi.getAppointmentById(appointmentId),
    enabled: !!appointmentId,
  });
}

/**
 * Create appointment mutation (Protected)
 */
export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentInput) =>
      appointmentsApi.createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

/**
 * Update appointment mutation (Protected)
 */
export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAppointmentInput }) =>
      appointmentsApi.updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

/**
 * Delete appointment mutation (Protected)
 */
export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentsApi.deleteAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}
