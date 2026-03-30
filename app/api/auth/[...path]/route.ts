import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleProxy(request, path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleProxy(request, path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleProxy(request, path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return handleProxy(request, path);
}

async function handleProxy(request: NextRequest, path: string[]) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const pathname = `/api/auth/${path.join('/')}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const url = new URL(pathname, backendUrl);
  if (searchParams) url.search = searchParams;

  // Clone headers, removing hop-by-hop headers
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('content-length');

  // Forward cookies from client to backend
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    headers.set('cookie', cookieHeader);
  }

  try {
    const body =
      request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.json().catch(() => null)
        : null;

    const response = await fetch(url.toString(), {
      method: request.method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Get all Set-Cookie headers from backend
    const setCookieHeaders = response.headers.getSetCookie?.() || [];

    // Create response with JSON content type
    const responseData = await response.json().catch(() => null);
    const newResponse = NextResponse.json(responseData, {
      status: response.status,
      statusText: response.statusText,
    });

    // Forward all Set-Cookie headers to client
    // In development (HTTP), strip Secure flag so browser accepts the cookie
    const isDev = process.env.NODE_ENV === 'development';
    setCookieHeaders.forEach((setCookieHeader) => {
      let modifiedCookie = setCookieHeader;
      if (isDev) {
        // Remove Secure flag for local development over HTTP
        modifiedCookie = setCookieHeader.replace(/; Secure/i, '');
      }
      newResponse.headers.append('Set-Cookie', modifiedCookie);
    });

    return newResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to backend' },
      { status: 500 },
    );
  }
}
