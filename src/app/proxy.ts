import createMiddleware from 'next-intl/middleware';

import { routing } from '../i18n/routing';


/**
 * Internationalization (i18n) Middleware.
 * * This middleware is responsible for:
 * 1. Detecting the user's preferred locale (via headers or cookies).
 * 2. Redirecting users to the appropriate localized path (e.g., from `/about` to `/en/about`).
 * 3. Providing the locale context to the rest of the application.
 */
export default createMiddleware(routing);

/**
 * Middleware Configuration Object.
 * * The 'matcher' array defines which paths this middleware should run on.
 * It is configured to ignore internal Next.js paths and static files for performance.
 * * @type {import('next/server').MiddlewareConfig}
 */
export const config: import('next/server').MiddlewareConfig = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
