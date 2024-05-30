import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    host: "172.16.42.6", 
    //host: "192.168.1.25",
    //host: "localhost",
    proxy: {
      "/api/": {
        target: 'http://localhost:5000', // URL du serveur backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
