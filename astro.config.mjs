// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yorch.github.io',
  vite: {
    // @ts-expect-error - tailwindcss vite plugin type mismatch with Astro's Vite PluginOption
    plugins: [tailwindcss()],
  },
});
