import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' — чтобы сборка работала на GitHub Pages из любого подкаталога
export default defineConfig({
  base: './',
  plugins: [react()],
});
