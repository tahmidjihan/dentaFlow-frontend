'use client';

import { createClient } from 'better-auth/react';

export const authClient = createClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});
