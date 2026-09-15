import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        beneficiary: resolve(__dirname, 'beneficiary.html')
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
