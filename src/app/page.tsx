import { getLocale } from 'next-intl/server';

import { auth } from '@/auth/auth';
import { redirect } from '@/i18n/navigation';


export default async function Index() {
  const session = await auth();
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
