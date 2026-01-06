import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';


const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

const configWithIntl = withNextIntl(nextConfig);

if (configWithIntl.experimental && 'turbo' in configWithIntl.experimental) {
  delete (configWithIntl.experimental as any).turbo;
}

export default configWithIntl;
