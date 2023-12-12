import { defineConfig, squooshImageService } from "astro/config";

import AutoImport from "astro-auto-import";
import config from "./src/config/config.json";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static"

export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  output: 'static',
  adapter: vercel(),
  image: {
    service: squooshImageService(),
  },
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  build: {
    format: config.site.trailing_slash ? 'directory' : 'file'
  },
});
