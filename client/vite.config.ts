import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/notification": {
        target: "http://127.0.0.1:9003",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://127.0.0.1:9000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
