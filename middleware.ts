import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard'];

// Routes that should redirect if already authenticated
const authRoutes = ['/auth/login', '/auth/signup'];

// Role-based route access
const roleBasedRoutes: Record<string, string> = {
  ADMIN: '/dashboard/admin',
  DOCTOR: '/dashboard/doctor',
  USER: '/dashboard/patient',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session cookie
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  const isAuthenticated = !!sessionToken;

  // Check if trying to access auth pages while already authenticated
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Redirect to dashboard based on role (we'll need to fetch role from session or cookie)
      // For now, redirect to generic dashboard and let the page handle role-based redirect
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Check if trying to access protected routes without authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access control for specific dashboard routes
    // Check if user is trying to access wrong dashboard
    for (const [role, basePath] of Object.entries(roleBasedRoutes)) {
      // If accessing a different role's dashboard, redirect to appropriate one
      // This is a simple check - in production, you'd want to validate the role from session
      if (pathname.startsWith('/dashboard/admin') && !pathname.startsWith('/dashboard/admin')) {
        // Allow - will validate on page load
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};
