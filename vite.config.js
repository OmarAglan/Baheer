import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/Baheer/', // Replace 'baheer' with your repository name if different
  plugins: [react(), tailwindcss()]
});
