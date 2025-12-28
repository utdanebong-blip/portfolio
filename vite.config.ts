import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/utibe-3d-portfolio/',
  plugins: [react()],
})
