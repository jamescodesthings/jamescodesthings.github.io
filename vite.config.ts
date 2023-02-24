import { defineConfig } from 'vite';
import { dependencies } from './package.json';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/**
 * Chunks to combine into vendor.js
 */
const vendorModules = ['react', 'react-router-dom', 'react-dom'];

/**
 * Creates manual chunk definitions for all top-level named dependencies
 * @param dependencies The dependencies from package.json
 * @return manual chunk configuration
 */
const renderChunks = (dependencies: Record<string, string>) => {
  const chunks = {};
  Object.keys(dependencies).forEach(key => {
    if (vendorModules.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({ exportAsDefault: true }), react()],
  build: {
    chunkSizeWarningLimit: 610,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: vendorModules,
          ...renderChunks(dependencies),
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
