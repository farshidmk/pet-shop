import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },
  plugins: [react(), tsconfigPaths()],
});
