// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? './' : '/', // relative only for production
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            // keep core react libs grouped
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // split the 3D stack into separate chunks to avoid one giant bundle
            'vendor-three': ['three'],
            'vendor-r3f': ['@react-three/fiber'],
            'vendor-drei': ['@react-three/drei'],
            // charts and heavy visualization libs
            'vendor-charts': ['recharts'],
            // carousel / embla
            'vendor-carousel': ['embla-carousel-react'],
            // query client
            'vendor-query': ['@tanstack/react-query']
          }
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
  };
});

