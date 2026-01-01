import { auth } from '@/auth/auth';


/**
 * Middleware configuration using Auth.js.
 * The 'auth' function acts as a wrapper to protect routes and
 * provide session data to the middleware layer.
 */
export const proxy = auth;

/**
 * Middleware Matcher Configuration
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files like CSS/JS)
     * - _next/image (image optimization files)
     * - auth (internal Auth.js routes like /api/auth/callback)
     * - favicon.ico (browser tab icon)
     * - login (the login page itself, to avoid infinite redirects)
     * - $ (the root path '/')
     */
    '/((?!api|_next/static|_next/image|auth|favicon.ico|login|$).*)',
  ],
};
