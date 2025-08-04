import react from '@vitejs/plugin-react'
import { CONFIG_BACKEND } from './src/App/config/config'

export default defineConfig(() => {

  return {
    base: './',
    plugins: [react()],
    define: {
      global: 'window',
    },
    server: {
      proxy: {
        '/api': {
          target: CONFIG_BACKEND.API_DIR,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})