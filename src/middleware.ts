import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

// * REDIRECTS
import { categories, etiquetas, posts, products, raiola } from './data/sitemaps'

// Example redirects array
const redirects = [
  ...etiquetas,
  ...posts,
  ...products,
  ...raiola,
  ...categories
]

const protectedAuthRoutes = ['login', 'signup', 'reset-password']
const protectedRoutes = ['perfil']

export default auth((req) => {
  const { pathname, origin } = req.nextUrl
  const user = req.auth?.user

  // Handle redirects
  const redirectRule = redirects.find(
    (rule) => rule.source === `${origin}${pathname}`
  )
  if (redirectRule) {
    const statusCode = redirectRule.permanent ? 308 : 307
    return NextResponse.redirect(new URL(redirectRule.destination), statusCode)
  }

  // Redirect authenticated users trying to access protected auth routes
  if (user && protectedAuthRoutes.includes(pathname.split('/')[1])) {
    const newUrl = new URL('/', origin)
    return NextResponse.redirect(newUrl)
  }

  // Redirect unauthenticated users trying to access protected routes
  if (user === undefined && protectedRoutes.includes(pathname.split('/')[1])) {
    const newUrl = new URL(`/login?redirectTo=${pathname}`, origin)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
