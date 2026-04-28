import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // TanStack Router plugin must be placed before @vitejs/plugin-react
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            { name: 'base-ui', test: /node_modules[\\/]@base-ui[\\/]/, priority: 25 },
            { name: 'tanstack', test: /node_modules[\\/]@tanstack[\\/]/, priority: 20 },
            {
              name: 'i18n',
              test: /node_modules[\\/](i18next|react-i18next|i18next-http-backend)[\\/]/,
              priority: 20,
            },
            { name: 'zod', test: /node_modules[\\/]zod[\\/]/, priority: 20 },
            { name: 'vendor', test: /node_modules/, priority: 10 },
          ],
        },
      },
    },
  },
});
