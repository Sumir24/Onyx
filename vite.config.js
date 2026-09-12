import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      // We will keep the original PNGs but use lossy compression 
      // that is visually indistinguishable from the original.
      png: {
        // 100 means visually lossless but highly compressed using oxipng/pngquant
        quality: 100,
        // Max compression effort to squeeze out file size without altering pixels
        compressionLevel: 9, 
      }
    }),
  ],
});
