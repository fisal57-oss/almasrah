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
        admin: resolve(__dirname, 'admin.html'),
        manager: resolve(__dirname, 'manager.html'),
        beneficiary: resolve(__dirname, 'beneficiary.html'),
        staff: resolve(__dirname, 'staff.html'),
        itqan: resolve(__dirname, 'itqan.html')
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
