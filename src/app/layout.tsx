import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { RootLayoutPropsType } from '@/app/layout.type';
import ThemeRegistry from '@/theme/ThemeContext';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';


/**
 * Main Layout for Non-localized routing.
 * The locale is resolved server-side via getLocale() instead of URL params.
 */
export default async function RootLayout({ children }: RootLayoutPropsType) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeRegistry>
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
