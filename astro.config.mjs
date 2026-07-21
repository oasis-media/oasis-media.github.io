import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://oasis-media.github.io',
  integrations: [sitemap()],
});