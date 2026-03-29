'use client';

import { createAuthClient } from 'better-auth/react';
import type { User } from '@/types/database';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
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
