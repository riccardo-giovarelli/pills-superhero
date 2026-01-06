import { getLocale } from 'next-intl/server';

import { auth } from '@/auth/auth';
import { redirect } from '@/i18n/navigation';


/**
 * Root Index Page Component.
 * * This is an asynchronous Server Component that acts as a traffic controller.
 * it checks the user's authentication status and redirects them to the
 * appropriate localized route.
 * * @async
 * @function Index
 * @returns {Promise<void>} This function never returns a component because it always triggers a redirect.
 */
export default async function Index(): Promise<void> {
  // Retrieve the user's session from the authentication provider
  const session = await auth();

  // Fetch the current locale from the server context
  const locale = await getLocale();

  if (session) {
    redirect({
      href: '/dashboard',
      locale: locale,
    });
  } else {
    redirect({
      href: '/login',
      locale: locale,
    });
  }
}
