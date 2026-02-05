import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  
  // Base path pour Vercel
  base: '/',
  
  // Configuration du build
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion', 'recharts'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'pdf-vendor': ['jspdf', 'jspdf-autotable']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  // Configuration du serveur
  server: {
    port: 5173,
    open: true,
    host: true,
    strictPort: true
  },
  
  // Prévisualisation
  preview: {
    port: 4173,
    host: true
  },
  
  // Optimisations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  
  // Résolution
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})