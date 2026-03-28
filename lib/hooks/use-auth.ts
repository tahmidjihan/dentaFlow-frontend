'use client';

import { authClient } from '@/lib/auth-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to get current session
 */
export function useSession() {
  const { data: session, isLoading, error, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const session = await authClient.getSession();
        return session;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  return {
    session: session as {
      session: {
        id: string;
        userId: string;
        expiresAt: Date;
      };
      user: {
        id: string;
        email: string;
        name: string;
        role: 'USER' | 'ADMIN' | 'DOCTOR';
        emailVerified: boolean;
        image?: string;
      };
    } | null,
    user: (session as any)?.user || null,
    isLoading,
    isAuthenticated: !!session,
    error,
    refetch,
  };
}

/**
 * Hook for sign in mutation
 */
export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const result = await authClient.signIn.email(data);
      return result;
    },
    onSuccess: () => {
      // Invalidate session query to refetch
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
}

/**
 * Hook for sign up mutation
 */
export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
      role?: 'USER' | 'ADMIN' | 'DOCTOR';
    }) => {
      const result = await authClient.signUp.email(data);
      return result;
    },
    onSuccess: () => {
      // Invalidate session query to refetch
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
}

/**
 * Hook for sign out mutation
 */
export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authClient.signOut();
    },
    onSuccess: () => {
      // Invalidate session query
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
}
