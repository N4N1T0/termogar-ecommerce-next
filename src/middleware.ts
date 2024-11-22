import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const protectedAuthRoutes = ['/login', '/signup', '/reset-password']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const user = req.auth?.user

  if (user && protectedAuthRoutes.includes(pathname)) {
    // Redirect authenticated users trying to access protected auth routes
    const newUrl = new URL('/', req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
