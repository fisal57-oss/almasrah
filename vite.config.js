import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '../utils/storage',
        replacement: resolve(__dirname, 'src/utils/bookingStorage.js')
      }
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        beneficiary: resolve(__dirname, 'beneficiary.html'),
        staff: resolve(__dirname, 'staff.html')
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
