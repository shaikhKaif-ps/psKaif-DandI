// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('UserToken')?.value;
  const UserId = request.cookies.get('UserId')?.value;
  const isSubscribed = request.cookies.get('isSubscribed')?.value;

  const isLoggedIn = !!token && !!UserId;
  const canAccessDashboard = isLoggedIn && isSubscribed === 'true';
  const { pathname } = request.nextUrl;

  // 🔒 Redirect logged-in users trying to access login/signup pages
  if (
    isLoggedIn &&
    (pathname === '/ind-login' || pathname === '/ind-signup' || pathname === '/org-signup')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 🔒 Protect dashboard: redirect if missing token/UserId or not subscribed
  if (pathname.startsWith('/dashboard')) {
    if (!isLoggedIn) {
      // Not logged in → redirect to login/home
      return NextResponse.redirect(new URL('/', request.url));
    } else if (isLoggedIn && isSubscribed !== 'true') {
      // Logged in but not subscribed → redirect to subscribe page
      return NextResponse.redirect(new URL('/all-app-courses', request.url));
    }
  }

  // 🔒 Protect /home if not logged in
  if (pathname.startsWith('/home') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// ✅ Routes where middleware should run
export const config = {
  matcher: ['/ind-login', '/ind-signup', '/org-signup', '/home/:path*', '/dashboard/:path*'],
};
