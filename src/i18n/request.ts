import { getRequestConfig } from 'next-intl/server';

import { routing } from '@/i18n/routing';


/**
 * Next-intl configuration for processing internationalization requests.
 * This function resolves the locale for the current request and loads the
 * corresponding translation messages.
 * * @param {Object} context - The request context.
 * @param {Promise<string | undefined>} context.requestLocale - The locale provided by the middleware or route.
 * @returns {Promise<RequestConfig>} An object containing the validated locale and its messages.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  /**
   * Wait for the requestLocale to be resolved from the server context.
   * @type {string | undefined}
   */
  const requested: string | undefined = await requestLocale;

  /**
   * Validate the requested locale against the supported locales defined in routing.
   * If the requested locale is invalid or undefined, fallback to the default locale.
   * @type {string}
   */
  const locale: string = requested && routing.locales.includes(requested as any) ? requested : routing.defaultLocale;

  return {
    /** The validated locale to be used for the current request context. */
    locale,
    /**
     * Dynamically import the translation file based on the determined locale.
     * Ensure the path matches your project structure.
     */
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
