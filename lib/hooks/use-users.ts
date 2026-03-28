'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as usersApi from '@/lib/APICalls/users.api';
import type { UpdateUserInput } from '@/lib/APICalls/users.api';

/**
 * Get all users
 */
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers,
  });
}

/**
 * Get user by ID
 */
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => usersApi.getUserById(userId),
    enabled: !!userId,
  });
}

/**
 * Update user mutation (Admin only)
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      usersApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

/**
 * Delete user mutation (Admin only)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

/**
 * Assign user to clinic mutation (Admin only)
 */
export function useAssignUserToClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, clinicId }: { userId: string; clinicId: string }) =>
      usersApi.assignUserToClinic(userId, clinicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
