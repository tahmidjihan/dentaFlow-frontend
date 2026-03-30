import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip proxy for verify-email route and auth pages
  if (pathname.startsWith('/verify-email') || pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // Check for session token in cookies
  // better-auth uses __Secure-better-auth.session_token (with Secure flag)
  // or better-auth.session_token (without Secure flag)
  const sessionToken =
    request.cookies.get('__Secure-better-auth.session_token') ||
    request.cookies.get('better-auth.session_token');

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard/')) {
    if (!sessionToken) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
