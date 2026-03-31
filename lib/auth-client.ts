import { createAuthClient } from 'better-auth/react';
import type { User } from '@/types/database';

export const authClient = createAuthClient({
  // Use API base URL from environment - empty string means relative paths
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  fetchOptions: {
    credentials: 'include', // Always include cookies for auth
  },
});

export const useSession = authClient.useSession;
export const useSignOut = authClient.signOut;

// Type augmentation for user with role
export type UserWithRole = User & {
  role?: 'USER' | 'ADMIN' | 'DOCTOR';
};
