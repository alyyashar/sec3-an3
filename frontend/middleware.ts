import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public routes that do not require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/n3',
  '/n3/',
  '/n3/dashboard',
  '/n3/dashboard/',
  '/'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  // If the user is not logged in and tries to access a protected route, redirect to login
  const isPublic = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))
  if (!isPublic && !token) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // If the user is logged in and tries to access login/register, redirect to dashboard
  if (token && (pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/auth/forgot-password')) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/n3xus'
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|api|public).*)',
  ],
}

export default middleware;
