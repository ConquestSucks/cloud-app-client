import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  const isAuthPage = pathname.startsWith('/auth');
  const isProtectedPage = pathname.startsWith('/dashboard');

  // Если нет токена и пользователь пытается зайти на защищенную страницу
  if (isProtectedPage && !accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // Если есть токен и пользователь пытается зайти на страницу логина
  if (isAuthPage && accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
}; 