import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetup from "vite-plugin-vue-setup-extend"
import { imagetools } from 'vite-imagetools' //使用语法https://github.com/JonasKruckenberg/imagetools/tree/main/packages/core
import AutoImport from 'unplugin-auto-import/vite' //自动导入您在代码中使用但尚未导入的 Vue 组件或 API，减少手动导入的需要。
import Components from 'unplugin-vue-components/vite' //自动导入和注册您在 Vue 模板中使用的组件，无需手动导入它们。
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import PurgeIcons from 'vite-plugin-purge-icons';
import viteCompression from 'vite-plugin-compression';
//处理默认导出的问题
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
//注入版本号
import { version } from './package.json'; // 从 package.json 读取版本号
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  const API_BASE_URL = env.VITE_API_BASE_URL;

  return {
    define: {
      __APP_VERSION__: JSON.stringify(version), // 注入版本号
    },
    plugins: [
      nodeResolve(), //处理默认导出
      commonjs(), //处理默认导出
      vue(), // Vue 3单文件组件支持
      vueSetup(), //允许在setup函数中使用name属性来指定组件的名称
      // 自动导入Vue API、Element Plus和Vant组件
      AutoImport({
        imports: ['vue'], // 指定自动导入Vue API
        dts: 'auto-imports.d.ts', // 自动生成的类型声明文件路径
        resolvers: [ElementPlusResolver(), VantResolver()],
      }),
      // 自动导入Vue API、Element Plus和Vant组件
      Components({
        dts: true, // 自动生成的类型声明文件路径
        resolvers: [ElementPlusResolver(), VantResolver()],
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
      env.VITE_NODE_ENV === 'production' && visualizer({
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
      env.VITE_NODE_ENV === 'production' && imagetools(),
    ].filter(Boolean), // 过滤掉无效插件,
    optimizeDeps: {
      include: ['lodash-es', 'dayjs'], // 预构建指定的依赖项
    },

    build: {
      minify: 'terser', // 使用terser进行代码压缩
      terserOptions: {
        compress: {
          drop_console: true, // 移除console语句
          drop_debugger: true // 移除debugger语句
        },
        output: {
          comments: true, // 移除注释
        },
      },
      //为 vendor 代码创建独的 chunk（不同依赖库提取到独立的文件）
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
      sourcemap: env.VITE_NODE_ENV === 'development' ? true : false,
      manifest: true, // 生成manifest.json文件
      reportCompressedSize: false, // 关闭brotli压缩大小提示因为耗费性能
      chunkSizeWarningLimit: 500 // 设置chunk大小警告的限制(以kB为单位)
    },
    server: {
      port: 3000, // 设置开发服务器端口
      open: true, // 自动打开浏器
      proxy: {
        [API_BASE_URL]: {
          target: env.VITE_NODE_ENV === 'development' ? env.VITE_TEST_URL : env.VITE_PRO_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), '')
        }
      }
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 设置 @ 别名指向 src 目录
        '@c': path.resolve(__dirname, 'src/components'), // 设置 @c 别名指向 src/components 目录
        '@u': path.resolve(__dirname, 'src/utils'), // 设置 @u 别名指向 src/utils 目录
      }
    },

    css: {
      //为每个 SCSS LESS 文件注入全局变量
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/themes/variables.scss";
            @import "@/styles/mixins/theme.scss";
            @import "@/styles/mixins/common.scss";
          `
        },
        less: {
          additionalData: `
            @import "@/styles/themes/variables.less";
            @import "@/styles/mixins/theme.less";
            @import "@/styles/mixins/common.less";
          `
        }
      },
    },
  }
})