// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.niloforestlodge.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
