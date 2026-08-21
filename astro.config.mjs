import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://oasis-media.github.io',
  integrations: [sitemap({
  filter: (page) => !page.includes('/404'),
})],
});