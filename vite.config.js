import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Strzykawa landing page with Tailwind CSS v3
export default defineConfig({
  plugins: [react()],
});