import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/japanese-study-app/',  // <- important for GitHub Pages
  plugins: [react()]
})
