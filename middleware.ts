import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET });
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Protect API routes
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;");

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};

