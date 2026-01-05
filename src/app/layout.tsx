import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ReactNode } from 'react';


interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Main Layout for Non-localized routing.
 * The locale is resolved server-side via getLocale() instead of URL params.
 */
export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
