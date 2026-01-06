import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';


/**
 * Localized Navigation Utilities.
 * * This configuration object generates specialized versions of Next.js navigation
 * components and hooks that are aware of the application's routing and locales.
 */
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
