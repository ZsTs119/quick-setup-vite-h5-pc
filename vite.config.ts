import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetup from "vite-plugin-vue-setup-extend"
import AutoImport from 'unplugin-auto-import/vite' //自动导入您在代码中使用但尚未导入的 Vue 组件或 API，减少手动导入的需要。
import Components from 'unplugin-vue-components/vite' //自动导入和注册您在 Vue 模板中使用的组件，无需手动导入它们。
import { ElementPlusResolver ,VantResolver} from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(), // Vue 3单文件组件支持
    vueSetup(), //允许在setup函数中使用name属性来指定组件的名称
    // 自动导入Vue API、Element Plus和Vant组件
    AutoImport({
      resolvers: [ElementPlusResolver(),VantResolver()],
    }),
     // 自动导入Vue API、Element Plus和Vant组件
    Components({
      resolvers: [ElementPlusResolver(),VantResolver()], 
    }),  
    // 自动导入Element Plus和Vant组件的样式
    createStyleImportPlugin({
       resolves: [
        ElementPlusResolve(),
        // 对于 Vant，需要自定义解析函数
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`
        }
      ],
    }),
    
    // 可视化打包分析工具
    process.env.NODE_ENV === 'production' && visualizer(),
    
    // SVG图标加载
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons/svg')],
      symbolId: 'icon-[name]'
    })
  ],
  
  optimizeDeps: {
    include: ['lodash-es'], // 预构建指定的依赖项
  },
  
  build: {
    minify: 'terser', // 使用terser进行代码压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除console语句
        drop_debugger: true // 移除debugger语句
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 输出的chunk文件名格式
        entryFileNames: 'js/[name]-[hash].js', // 输出的入口文件名格式
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 输出的静态资源文件名格式
        manualChunks(id) { // 自定义拆分chunk的规则
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    commonjsOptions: {
      include: [/lodash-es/] // 转换CommonJS模块为ESM
    },
    sourcemap: false, // 关闭sourcemap生成
    manifest: true, // 生成manifest.json文件
    chunkSizeWarningLimit: 500 // 设置chunk大小警告的限制(以kB为单位)
  },
  server: {
    host: '0.0.0.0', // 监听所有地址
    port: 3000, // 设置开发服务器端口
    open: true, // 自动打开浏览器
    proxy: {
      [process.env.VITE_API_BASE_URL]: {
        target: process.env.VITE_NODE_ENV === 'development' ? process.env.VITE_TEST_URL : process.env.VITE_PRO_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${process.env.VITE_API_BASE_URL}`), '')
      }
    }
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 @ 别名指向 src 目录
    },
  },
  
  css: {
     //为每个 SCSS 文件注入全局变量
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/variables.scss";`, // 全局 SCSS 变量
      },
      less: {
        additionalData: `@import "@/style/variables.less";`, // 全局 Less 变量
      },
    },
  },
})