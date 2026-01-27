import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deployment config
  // For user pages (username.github.io), base is usually '/'
  // For project pages, it's '/repo-name/'
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
