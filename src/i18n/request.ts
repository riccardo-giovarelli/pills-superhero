import { getRequestConfig } from 'next-intl/server';

import { routing } from '@/i18n/routing';


/**
 * Next-intl configuration for processing internationalization requests.
 * This function resolves the locale for the current request and loads the
 * corresponding translation messages.
 * * @param {Object} context - The request context provided by next-intl.
 * @param {Promise<string | undefined>} context.requestLocale - The locale provided by the middleware or route.
 * @returns {Promise<import('next-intl/server').RuntimeConfig>} An object containing the validated locale and its messages.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  /**
   * The resolved locale string from the request context.
   * @type {string | undefined}
   */
  const requested: string | undefined = await requestLocale;

  /**
   * The final validated locale.
   * Validates against supported locales in routing; fallbacks to defaultLocale.
   * @type {string}
   */
  const locale: string = requested && routing.locales.includes(requested as any) ? requested : routing.defaultLocale;

  return {
    /** The validated locale to be used for the current request context. */
    locale,
    /**
     * Dynamically imports the translation JSON file for the determined locale.
     * @throws {Error} if the message file cannot be found.
     */
    messages: (await import(`../../messages/${locale}.ts`)).default,
  };
});
