'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as doctorsApi from '@/lib/APICalls/doctors.api';
import type { UpdateDoctorInput } from '@/lib/APICalls/doctors.api';

/**
 * Get all doctors
 */
export function useDoctors() {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () => doctorsApi.getDoctors({ showToast: false }),
  });
}

/**
 * Get doctor by ID
 */
export function useDoctor(doctorId: string) {
  return useQuery({
    queryKey: ['doctors', doctorId],
    queryFn: () => doctorsApi.getDoctorById(doctorId),
    enabled: !!doctorId,
  });
}

/**
 * Update doctor mutation (Admin only)
 */
export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDoctorInput }) =>
      doctorsApi.updateDoctor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}

/**
 * Delete doctor mutation (Admin only)
 */
export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => doctorsApi.deleteDoctor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}

/**
 * Assign doctor to clinic mutation (Admin only)
 */
export function useAssignDoctorToClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ doctorId, clinicId }: { doctorId: string; clinicId: string }) =>
      doctorsApi.assignDoctorToClinic(doctorId, clinicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}
