import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    base: './',
    plugins: [react()],
    define: {
      global: 'window',
    },
    esbuild: {
      //drop: mode === 'production' ? ['console', 'debugger'] : [],
      drop: mode === 'production' ? ['debugger'] : [],
      legalComments: 'none' 
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api - escuela de arbitros/, '')
        }
      }
    }
  }
})