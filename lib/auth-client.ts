import { createAuthClient } from 'better-auth/react';
import type { User } from '@/types/database';

export const authClient = createAuthClient({
  // Use relative path for auth - rewrites will handle proxying to backend
  baseURL: typeof window !== 'undefined' ? window.location.origin : undefined,
  fetchOptions: {
    credentials: 'include',
  },
});

export const useSession = authClient.useSession;
export const useSignOut = authClient.signOut;

// Type augmentation for user with role
export type UserWithRole = User & {
  role?: 'USER' | 'ADMIN' | 'DOCTOR';
};
