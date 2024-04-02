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
import PurgeIcons from 'vite-plugin-purge-icons';
import VitePluginImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';
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
    process.env.VITE_NODE_ENV === 'production' && visualizer({
      open: true, // 是否在打包完成后打开报告
      gzipSize: true, // 是否展示gzip压缩大小
      brotliSize: false, // 是否展示brotli压缩大小
    }),
    
    // SVG图标加载
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons/svg')],
      symbolId: 'icon-[name]'
    }),
    //PurgeIcons用于只打包项目中实际用到的SVG图标
    PurgeIcons(),
    //对所有静态资源做 gzip 压缩，可以在服务器支持gzip的情况下进一步减少体积
    viteCompression({
      ext: '.gz', // 使用gzip压缩
    }),
    //优化图像资源
    process.env.VITE_NODE_ENV === 'production' && VitePluginImagemin({
      imageminOptions: {
        plugins: [
          // jpeg/jpg 图片的压缩
          ['jpegtran', { progressive: true }],
          // png 图片的压缩
          ['optipng', { optimizationLevel: 5 }],
          // svg 图片的压缩
          ['svgo', {
            plugins: [
              {
                // 禁用某些 SVGO 插件
                name: 'preset-default',
                params: {
                  overrides: {
                    // 禁用已经废弃的移除viewBox属性的插件
                    removeViewBox: false,
                    // 启用移除无用 stroke 和 fill 属性的插件
                    removeUselessStrokeAndFill: true,
                    // 删除无用的 defs
                    removeEmptyAttrs: true,
                  },
                },
              },
            ],
          }],
        ],
      },
      // 启用 WebP 图片格式的压缩可以更进一步地减少图片体积
      // 额外的 png 和 jpg 的 WebP 图片，质量参数设置为 85
      // webp options
      webpOptions: {
        quality: 85,
      },
    }),
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
    //为 vendor 代码创建单独的 chunk（不同依赖库提取到独立的文件）
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        // 同时，你可以启用splitVendorChunk来将第三方库代码分离
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name ? chunkInfo.name : 'chunk';
          if (chunkInfo.isEntry) {
            return `js/${name}-[hash].js`;
          } else if (chunkInfo.name.includes('node_modules')) {
            return 'vendor-[hash].js';
          } else {
            return `js/${name}-[hash].js`;
          }
        },
      },
    },
    commonjsOptions: {
      include: [/lodash-es/] // 转换CommonJS模块为ESM
    },
    //生产环境关闭sourcemap,开发环境开启sourcemap
    sourcemap: process.env.VITE_NODE_ENV === 'development' ? true : false,
    manifest: true, // 生成manifest.json文件
    brotliSize: false, // 关闭brotli压缩大小提示因为耗费性能
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