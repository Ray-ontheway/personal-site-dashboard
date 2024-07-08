import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import eslintPlugin from 'vite-plugin-eslint'
import vitePluginExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // eslintPlugin({
    //   include: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.js', './src/**/*.jsx', './src/**/*.vue'],
    // }),
    vue(),
    vitePluginExtend(),
    vueJsx(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    svgLoader(),
    createSvgIconsPlugin({ iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/sprite')], symbolId: 'icon-[name]' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
  // server: {
  //   port: 3000,
  //   open: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:10001',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
