import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { seoPlugin } from './scripts/seoPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Framework code changes rarely, so keep it in its own long-cached file.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'vendor';
          if (id.includes('node_modules/lucide-react')) return 'icons';
        },
      },
    },
  },
});
