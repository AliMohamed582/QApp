// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),       // allows imports like "src/..."
      frontend: path.resolve(__dirname, 'src'),  // allows imports like "frontend/..."
    },
  },
});
