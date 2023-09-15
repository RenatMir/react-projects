import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dynamicImport from 'vite-plugin-dynamic-import'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '#root': __dirname,
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    react(),
    dynamicImport()
  ],
})
