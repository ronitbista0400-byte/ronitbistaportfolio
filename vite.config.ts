import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: './',
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ─── Build output: separate folders for JS, CSS, images ───────────────────
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,       // strip console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
    },

    rollupOptions: {
      output: {
        // ── JS chunks → assets/js/ ──
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        // ── CSS + images → assets/css/ and assets/images/ ──
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          if (/\.(css)$/.test(name))                   return 'assets/css/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) return 'assets/images/[name]-[hash][extname]';
          if (/\.(woff2?|ttf|otf|eot)$/.test(name))   return 'assets/fonts/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },

        // ── Manual chunk splitting for faster parallel loading ──
        manualChunks(id) {
          // React core → own chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Three.js → own chunk (large)
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          // GSAP → own chunk
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          // Lenis smooth scroll
          if (id.includes('node_modules/lenis')) {
            return 'vendor-lenis';
          }
          // Radix UI components → own chunk
          if (id.includes('@radix-ui')) {
            return 'vendor-radix';
          }
          // Lucide icons
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },

    // ── Raise chunk size warning threshold (Three.js is large) ──
    chunkSizeWarningLimit: 1000,
  },

  // ─── Dev server optimisations ─────────────────────────────────────────────
  optimizeDeps: {
    include: [
      'react', 'react-dom',
      'gsap', 'gsap/ScrollTrigger',
      'lenis',
      'three',
      '@react-three/fiber', '@react-three/drei',
      'lucide-react',
    ],
  },

  // ─── CSS config ───────────────────────────────────────────────────────────
  css: {
    devSourcemap: true,
  },
});
