'use client';

import {
  authClient,
  useSession as authUseSession,
  useSignOut as authUseSignOut,
  type UserWithRole,
} from '@/lib/auth-client';

/**
 * Hook to get current session using better-auth built-in hook
 */
export function useSession() {
  const { data: session, isPending: isLoading, error } = authUseSession();

  const user = (session?.user || null) as UserWithRole;

  return {
    session,
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}

/**
 * Hook for sign out mutation using better-auth built-in hook
 */
export function useSignOut() {
  return authUseSignOut();
}

/**
 * Hook for sign in mutation
 */
export function useSignIn() {
  return {
    mutate: async (
      data: { email: string; password: string },
      options?: { onSuccess?: () => void; onError?: () => void },
    ) => {
      try {
        await authClient.signIn.email(data);
        options?.onSuccess?.();
      } catch (error) {
        options?.onError?.();
      }
    },
    isPending: false,
  };
}

/**
 * Hook for sign up mutation
 */
export function useSignUp() {
  return {
    mutate: async (
      data: {
        email: string;
        password: string;
        name: string;
        role?: 'USER' | 'ADMIN' | 'DOCTOR';
      },
      options?: { onSuccess?: () => void; onError?: () => void },
    ) => {
      try {
        await authClient.signUp.email(data);
        options?.onSuccess?.();
      } catch (error) {
        options?.onError?.();
      }
    },
    isPending: false,
  };
}
