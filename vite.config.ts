import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Vite Config
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, '/index.html'),
        content: resolve(__dirname, '/src/content.tsx'),
        background: resolve(__dirname, '/src/background.ts'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  publicDir: 'public', // 추가적으로 public 디렉토리를 명시적으로 설정
})
