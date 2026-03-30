'use client';

import { ProtectedRoute } from './ProtectedRoute';

interface DashboardGuardProps {
  children: React.ReactNode;
}

/**
 * Client-side wrapper that protects all dashboard routes
 * Ensures only authenticated users can access dashboard pages
 */
export function DashboardGuard({ children }: DashboardGuardProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
