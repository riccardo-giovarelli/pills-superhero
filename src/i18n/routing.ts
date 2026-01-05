import { defineRouting } from 'next-intl/routing';


// Centralized i18n routing settings
export const routing = defineRouting({
  locales: ['en', 'it'],
  defaultLocale: 'en',
  localePrefix: 'never',
});
