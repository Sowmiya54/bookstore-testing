import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 🔹 fixed port
    proxy: {
      '/books': 'http://localhost:5000',
      '/order': 'http://localhost:5000',
      '/health': 'http://localhost:5000'
    }
  }
});
