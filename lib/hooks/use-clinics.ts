'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as clinicsApi from '@/lib/APICalls/clinics.api';
import type { CreateClinicInput, UpdateClinicInput } from '@/lib/APICalls/clinics.api';
import type { Clinic } from '@/types/database';

/**
 * Get all clinics
 */
export function useClinics() {
  return useQuery<Clinic[]>({
    queryKey: ['clinics'],
    queryFn: () => clinicsApi.getClinics({ showToast: false }),
  });
}

/**
 * Get clinic by ID
 */
export function useClinic(clinicId: string) {
  return useQuery<Clinic>({
    queryKey: ['clinics', clinicId],
    queryFn: () => clinicsApi.getClinicById(clinicId),
    enabled: !!clinicId,
  });
}

/**
 * Create clinic mutation (Admin only)
 */
export function useCreateClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClinicInput) => clinicsApi.createClinic(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
    },
  });
}

/**
 * Update clinic mutation (Admin only)
 */
export function useUpdateClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClinicInput }) =>
      clinicsApi.updateClinic(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
    },
  });
}

/**
 * Delete clinic mutation (Admin only)
 */
export function useDeleteClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clinicsApi.deleteClinic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
    },
  });
}
