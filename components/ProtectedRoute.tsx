'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('USER' | 'ADMIN' | 'DOCTOR')[];
  redirectTo?: string;
}

/**
 * Client-side guard component that protects routes based on authentication and RBAC
 * Redirects unauthenticated users to login and users without proper role to their dashboard
 */
export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useSession();

  useEffect(() => {
    // Wait for session to load
    if (isLoading) return;
    console.log(user);
    // Not authenticated - redirect to login
    if (!isAuthenticated || !user) {
      const currentPath = window.location.pathname;
      const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`;
      router.push(loginUrl);
      return;
    }

    // Check role-based access if allowedRoles is specified
    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = user.role || 'USER';

      if (!allowedRoles.includes(userRole as 'USER' | 'ADMIN' | 'DOCTOR')) {
        // User doesn't have the required role - redirect to their appropriate dashboard
        const dashboardRoutes: Record<string, string> = {
          ADMIN: '/dashboard/admin',
          DOCTOR: '/dashboard/doctor',
          USER: '/dashboard/patient',
        };

        const redirectPath =
          redirectTo || dashboardRoutes[userRole] || '/dashboard/patient';
        router.push(redirectPath);
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, redirectTo, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }

  // Don't render children if not authenticated or wrong role
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role || 'USER';
    if (!allowedRoles.includes(userRole as 'USER' | 'ADMIN' | 'DOCTOR')) {
      return null;
    }
  }

  return <>{children}</>;
}

/**
 * Higher-order component for protecting pages
 */
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: ('USER' | 'ADMIN' | 'DOCTOR')[],
  redirectTo?: string,
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute allowedRoles={allowedRoles} redirectTo={redirectTo}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
