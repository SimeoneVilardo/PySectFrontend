import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/notification": {
        target: "http://pysect-backend-notification-local:8000",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://pysect-backend-challenge-local:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
