import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (formerly Middleware) logic.
 * Handles network boundary tasks like redirects, rewrites, and header modifications.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic diagnostic logging seen in Vercel logs
  if (pathname === '/') {
    console.log('[Proxy] Root hit - Proceeding to app/page.tsx');
  }

  return NextResponse.next();
}

// Ensure both default and named exports satisfy Next.js 16 requirements
export default proxy;

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
