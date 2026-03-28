/**
 * Auth API Calls
 * All API endpoints related to authentication
 */

import { post } from '../lib/fetchAPI';

export interface SignUpInput {
  email: string;
  password: string;
  name: string;
  role?: 'USER' | 'ADMIN' | 'DOCTOR';
}

export interface SignInInput {
  email: string;
  password: string;
}

/**
 * Sign up a new user
 */
export const signUp = (data: SignUpInput) =>
  post<{ session: { id: string; userId: string; expiresAt: Date }; user: { id: string; email: string; name: string; role: string } }>(
    '/api/auth/sign-up',
    data,
  );

/**
 * Sign in with email and password
 */
export const signIn = (data: SignInInput) =>
  post<{ session: { id: string; userId: string; expiresAt: Date }; user: { id: string; email: string; name: string; role: string } }>(
    '/api/auth/sign-in',
    data,
  );

/**
 * Sign out current user
 */
export const signOut = () => post('/api/auth/sign-out');
