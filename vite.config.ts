import { defineConfig } from 'vite'
import vue, { Options } from '@vitejs/plugin-vue'
import { resolve } from 'path'
import pxtovw from 'postcss-px-to-viewport'
const loder_pxtovw = pxtovw({
  viewportWidth: 1920,
  viewportUnit: 'vw'
})
// https://vitejs.dev/config/ 
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname,'./src')
      }
    ]
  },
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  }
})
