import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (formerly Middleware) logic.
 * Handles network boundary tasks like redirects, rewrites, and header modifications.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic diagnostic logging
  console.log(`[Proxy] Intercepted request for: ${pathname}`);

  return NextResponse.next();
}

// See Next.js 16 documentation: Only runs on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
