# quick-setup-vite-h5-pc

一个基于 Vite + Vue3 + TypeScript 的多端应用开发脚手架，支持 H5 和 PC 端开发。

## 特性

- 🚀 Vite + Vue3 + TypeScript 开发
- 📱 支持 H5 和 PC 端适配
- 🔐 完整的登录权限控制
- 📦 Pinia 状态管理（支持持久化）
- 🎨 Element Plus 和 Vant UI 组件库
- 🔄 Axios 请求封装
- 🎯 TypeScript 类型安全
- 📝 ESLint + Prettier 代码规范
- 🎁 SVG 图标组件封装

## 快速开始

```bash
# 安装依赖
npm install

# 开发环境
npm run dev        # PC端
npm run dev:h5     # H5端

# 生产构建
npm run build:prod     # PC端
npm run build:prod:h5  # H5端
```

## 项目配置

### Vite 配置特性

- ⚡️ 快速的冷启动和热更新
- 🔧 自动导入 API 和组件
- 📦 智能的构建优化
  - Gzip 压缩
  - 图片优化
  - 代码分割
  - Tree-shaking
- 🔍 开发工具支持
  - TypeScript
  - Vue DevTools
  - 打包分析

### 样式配置

- 支持 SCSS/LESS 预处理器
- 全局变量注入
- 按需加载样式
- 主题定制支持

## 核心功能

### 状态管理

使用 Pinia 进行状态管理，支持数据持久化：

```typescript
import { useLoginStore } from '@/stores/login'

const loginStore = useLoginStore()
// 获取登录状态
const isLoggedIn = loginStore.isLoggedIn
```

### 路由权限

完整的路由权限控制系统：

```typescript
{
  path: '/settings',
  meta: {
    requiresAuth: true,    // 需要登录
    roles: ['admin'],      // 需要管理员权限
    title: '系统设置'      // 页面标题
  }
}
```

### API 请求

规范的 API 请求封装：

```typescript
import { userApi } from '@/apis'

// 登录请求
const login = async (username: string, password: string) => {
  const result = await userApi.login({ username, password })
}
```

### 图标组件

两种图标组件支持：

```vue
<!-- SVG图标 -->
<svg-icon icon-class="user" />

<!-- IconFont图标 -->
<icon-font type="close" />
```

## 开发规范

### 目录结构

```
src/
├── apis/           # API 接口
├── assets/         # 静态资源
├── components/     # 公共组件
├── router/         # 路由配置
├── stores/         # 状态管理
├── styles/         # 全局样式
├── utils/          # 工具函数
└── views/          # 页面组件
```

### TypeScript 规范

- 统一使用 interface 定义对象类型
- 必须声明 API 请求和响应类型
- 使用类型推导优化代码

### API 开发规范

- 按模块组织 API 文件
- 统一使用 RequestData 类型
- 完整的 JSDoc 注释
- 请求参数类型定义

## 联系方式

- 作者：ZsTs119
- 邮箱：zsts@foxmail.com
- GitHub：https://github.com/ZsTs119

## License

[MIT](LICENSE)
