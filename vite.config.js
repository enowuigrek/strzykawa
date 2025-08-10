import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Surzykawa landing page.  We enable
// the React plugin so that JSX can be compiled, and leave all other
// settings at their defaults.  If you later decide to deploy the
// site under a subpath (e.g. on GitHub Pages), you can set the
// `base` property here.
export default defineConfig({
  plugins: [react()],
});