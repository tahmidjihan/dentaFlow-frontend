'use client';

import {
  authClient,
  useSession as authUseSession,
  useSignOut as authUseSignOut,
  type UserWithRole,
} from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

export function useSignOut() {
  const router = useRouter();

  const signOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  return { signOut };
}

export function useSignIn() {
  const router = useRouter();

  return {
    mutate: async (
      data: { email: string; password: string },
      options?: { onSuccess?: () => void; onError?: (error?: unknown) => void },
    ) => {
      try {
        const result = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (result.error) {
          options?.onError?.(result.error);
          return;
        }

        // Manually redirect after successful sign in
        router.push('/dashboard');
        options?.onSuccess?.();
      } catch (error) {
        console.error('Sign in error:', error);
        options?.onError?.(error);
      }
    },
    isPending: false,
  };
}

export function useSignUp() {
  const router = useRouter();

  return {
    mutate: async (
      data: {
        email: string;
        password: string;
        name: string;
      },
      options?: { onSuccess?: () => void; onError?: (error?: unknown) => void },
    ) => {
      try {
        const result = await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name,
        });

        if (result.error) {
          options?.onError?.(result.error);
          return;
        }

        // Manually redirect after successful sign up
        router.push('/dashboard');
        options?.onSuccess?.();
      } catch (error) {
        console.error('Sign up error:', error);
        options?.onError?.(error);
      }
    },
    isPending: false,
  };
}
