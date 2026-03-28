import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard'];

// Routes that should redirect if already authenticated
const authRoutes = ['/auth/login', '/auth/signup'];

// Role-based route access
const roleBasedRoutes: Record<string, string[]> = {
  ADMIN: ['/dashboard/admin'],
  DOCTOR: ['/dashboard/doctor'],
  USER: ['/dashboard'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session cookie
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  const isAuthenticated = !!sessionToken;

  // Check if trying to access auth pages while already authenticated
  if (authRoutes.some((route) => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check if trying to access protected routes without authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // TODO: Role-based access control (requires session data in cookie or API call)
    // For now, we'll let the page components handle role checks
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
