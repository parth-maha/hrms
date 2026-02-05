import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@utilities' : path.resolve(__dirname,'./src/utilities'),
      '@components' : path.resolve(__dirname,'./src/components'),
      '@types' : path.resolve(__dirname,'./src/types'),
      '@services' : path.resolve(__dirname,'./src/services'),
      '@hooks' : path.resolve(__dirname,'./src/hooks'),
      '@store' : path.resolve(__dirname,'./src/store'),
    }
  },
  server:{
    port : 3000
  },
  plugins: [react(),tailwindcss()],
})
