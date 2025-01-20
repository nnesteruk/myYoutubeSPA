import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/youtubeSpa/',
  define: {
    'process.env': process.env, // если вам нужен доступ к process.env
  },
});
