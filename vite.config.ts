import { defineConfig } from 'vite';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5174
  },
  plugins: [
    react({
      plugins: [],
      tsDecorators: true,
    }),
    paths({ root: '..' })
  ],
});
