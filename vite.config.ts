import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/seda-tx-dashboard/',
  plugins: [react()],
  server: {
    port: 3000,
  },
}) 