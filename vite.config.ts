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
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
