import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import siteConfig from './src/data/site-config';

// https://astro.build/config
export default defineConfig({
    site: siteConfig.website,
    integrations: [
        sitemap(),
        react(),
        mdx()
    ],
    vite: {
        plugins: [tailwindcss()],
    }
});
