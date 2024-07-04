import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), AutoImport({ resolvers: [ElementPlusResolver()] }), Components({ resolvers: [ElementPlusResolver()] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
})
