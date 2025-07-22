import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
      define:{
    global: "window",
  },
  plugins: [react(), tailwindcss()],
    server: {
    host: true, // ⬅️ Allows LAN access
    port: 5173, // Or any port you want
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
