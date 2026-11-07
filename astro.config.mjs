import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkDirective from "remark-directive";
import remarkShortcuts from "./src/plugins/remark-shortcuts.mjs";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://oasis-media.github.io',
  markdown: {
        processor: unified({
            remarkPlugins: [remarkDirective, remarkShortcuts],
        }),
    },
  integrations: [sitemap({
  filter: (page) => !page.includes('/404'),
})],
});