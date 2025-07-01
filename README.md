# vue3-vite-multi-platform-template Vue3 多端开发脚手架（H5/PC）

<div align="center">
  
![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen)
![Vite](https://img.shields.io/badge/Vite-5.2-646CFF)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.7-409eff)
![Vant](https://img.shields.io/badge/Vant-4.9-4fc08d)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

<div align="center">

[English](./README.en.md) | [简体中文](./README.md)

</div>

> **一个功能强大、开箱即用的 Vue 3 + + Vite + TypeScript 多端应用开发脚手架，同时支持 H5 和 PC 端开发。**

## 🚀 特性一览

- **现代技术栈**：Vite 5.2 + Vue 3.5 + TypeScript 5.3 + Pinia 2.1
- **多端适配**：一套代码，同时支持 H5 和 PC 端
- **UI 组件库**：Element Plus 2.7 (PC 端) + Vant 4.9 (移动端)
- **自动导入**：组件和 API 自动导入，无需手动 import
- **主题系统**：支持多主题切换，内置暗黑模式
- **权限控制**：完整的登录认证和权限管理
- **状态管理**：基于 Pinia 的状态管理，支持持久化
- **请求封装**：Axios 请求封装，支持常规请求和流式请求
- **安全防护**：内置请求签名和设备指纹识别
- **图标系统**：SVG 图标和 Iconfront 图标组件封装
- **自定义 Hooks**：常用功能封装为 Hooks
- **构建优化**：自动代码分割、压缩和优化
- **Cursor 规则**：提供详细的项目规范文档，支持 Cursor AI 开发助手智能理解项目架构和开发规范

## 📁 目录结构

```
src/
├── apis/                # API 接口
│   ├── modules/        # 按模块组织的API
│   │   ├── user.ts     # 用户相关API
│   │   └── script.ts   # 脚本相关API
│   ├── types/          # API类型定义
│   └── index.ts        # 统一导出
├── assets/             # 静态资源
│   └── icons/          # 图标资源
├── components/         # 公共组件
│   ├── SvgIcon/       # SVG图标组件
│   ├── InconFent/     # Iconfront图标组件
│   └── ThemeSwitch/   # 主题切换组件
├── hooks/              # 自定义Hooks
│   ├── useNProgress.ts # 进度条Hook
│   └── useThemeTransition.ts # 主题切换过渡动画Hook
├── router/             # 路由配置
│   ├── home/          # 首页路由模块
│   ├── login/         # 登录路由模块
│   └── index.ts       # 路由主文件
├── stores/             # 状态管理
│   ├── theme.ts       # 主题状态
│   ├── token.ts       # Token管理
│   ├── user.ts        # 用户信息
│   └── login.ts       # 登录状态
├── styles/             # 全局样式
│   ├── themes/        # 主题相关
│   │   └── variables.scss # 主题变量定义
│   ├── transitions/   # 过渡动画
│   │   └── theme.scss # 主题切换动画
│   └── mixins/        # 样式混入
├── utils/             # 工具函数
│   ├── http/         # HTTP请求封装
│   ├── device.ts     # 设备信息
│   └── index.ts      # 工具统一导出
└── views/            # 页面组件
    ├── login/        # 登录页面
    ├── home/         # 首页
    ├── settings/     # 设置页面
    └── error/        # 错误页面
```

## 📚 项目规范指南

项目内置了七大核心规范，确保开发过程中的一致性和高质量代码输出：

### 1. 项目介绍规范

项目基于现代前端技术栈构建，核心技术包括：

- Vue 3.5.x、TypeScript 5.3.x、Vite 5.2.x
- 状态管理：Pinia 2.1.x (含持久化)
- UI 组件库：Element Plus 2.7.x (PC 端)、Vant 4.9.x (移动端)
- 工具库：Axios、Lodash-es、TypeScript-MD5 等

### 2. 项目结构规范

项目采用模块化、分层次的目录结构，主要包括：

- `apis`: API 接口层，按业务模块组织
- `components`: 全局公共组件
- `hooks`: 自定义 Hooks
- `router`: 路由配置，模块化管理
- `stores`: Pinia 状态管理
- `styles`: 全局样式和主题系统
- `utils`: 工具函数
- `views`: 页面组件

### 3. API 使用规范

API 请求采用统一封装，包含权限认证、请求签名、错误处理等机制：

- 请求流程：参数准备 → 权限验证 → 请求签名 → 设备指纹 → 请求发送 → 响应处理
- API 定义规范：按业务模块分组、类型严格定义、命名规范统一
- 支持常规请求和流式请求两种方式

### 4. 代码注释规范

采用 JSDoc 风格的注释规范：

- 函数和方法：包含描述、参数说明、返回值说明、示例
- 类和接口：包含描述、属性说明
- 复杂业务逻辑：分步骤说明
- 特殊处理或边界条件：详细说明原因和处理方式

### 5. 核心 Hooks 与方法

项目封装了多个核心 Hooks 和工具方法：

- 用户认证与权限：`useUserStore`、`useTokenStore`
- 主题管理：`useThemeStore`、`useThemeTransition`
- HTTP 请求：标准请求和流式请求封装
- 进度条：`useNProgress`
- 安全工具：设备指纹、请求签名

### 6. 新增模块规范

添加新功能模块的标准流程：

- 创建 API 模块：定义接口、参数和响应类型
- 创建视图组件：页面组件及私有组件
- 创建路由配置：定义路由、权限和元信息
- 创建状态管理：定义 State、Getters 和 Actions

### 7. 代码风格规范

基于 Airbnb JavaScript 风格指南，结合 Vue 官方风格指南：

- 变量与引用：优先使用 const，需要重新赋值时使用 let
- 函数：优先使用箭头函数，使用参数默认值
- 组件：使用 PascalCase 命名，详细定义 Props
- TypeScript：严格类型定义，提高代码可读性
- 命名规范：描述性命名，遵循命名约定

## 🛠️ 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
# PC端开发
pnpm dev

# H5端开发
pnpm dev:h5
```

### 生产环境

```bash
# PC端生产环境
pnpm pro

# H5端生产环境
pnpm proH5
```

### 构建项目

```bash
# PC端构建(开发环境)
pnpm build:dev

# H5端构建(开发环境)
pnpm build:dev:h5

# PC端构建(生产环境)
pnpm build:prod

# H5端构建(生产环境)
pnpm build:prod:h5
```

## 📘 开发指南

### 主题系统

项目内置了强大的主题系统，支持多主题切换和平滑过渡动画。

#### 1. 主题配置

主题变量定义在 `src/styles/themes/variables.scss` 中：

```scss
// 基础变量定义
$themes: (
  light: (
    // 亮色主题
    --primary-color: #409eff,
    --bg-color: #ffffff,
    --text-primary: #303133,
    // 更多变量...
  ),
  dark: (
    // 暗色主题
    --primary-color: #409eff,
    --bg-color: #141414,
    --text-primary: #ffffff,
    // 更多变量...
  ),
  // 可以添加更多自定义主题...
  red:
    (
      --primary-color: #f56c6c,
      // 红色主题的其他变量...
    ),
);
```

#### 2. 使用主题切换组件

在页面中引入 `ThemeSwitch` 组件：

```vue
<template>
  <div class="container">
    <!-- 主题切换按钮 -->
    <ThemeSwitch />

    <!-- 页面内容 -->
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import { useThemeStore } from "@/stores/theme";

// 获取主题状态管理实例
const themeStore = useThemeStore();

// 在组件挂载时初始化主题
onMounted(() => {
  themeStore.initTheme();
});
</script>
```

#### 3. 在父容器中应用主题

在父容器中应用主题变量和过渡动画：

```vue
<template>
  <div class="app-container">
    <!-- 页面内容 -->
  </div>
</template>

<style lang="scss">
// 导入主题过渡动画样式
@import "@/styles/transitions/theme.scss";

.app-container {
  // 使用主题混入
  @include useTheme;

  // 使用主题变量
  background: var(--bg-color);
  color: var(--text-primary);
}
</style>
```

#### 4. 主题状态管理

通过 `useThemeStore` 可以手动控制主题：

```typescript
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

// 切换到暗色主题
themeStore.setTheme("dark");

// 切换到亮色主题
themeStore.setTheme("light");

// 切换到自定义主题
themeStore.setTheme("red");

// 切换暗黑/亮色模式
themeStore.toggleDarkMode();

// 获取当前主题
console.log(themeStore.currentTheme);

// 检查是否为暗黑模式
console.log(themeStore.isDarkMode);
```

#### 5. 主题过渡动画

项目使用 View Transitions API 实现平滑的主题切换动画，通过 `useThemeTransition` Hook 封装：

```typescript
import { useThemeTransition } from "@/hooks/useThemeTransition";

const { handleThemeChange } = useThemeTransition();

// 切换主题并应用过渡动画
// 参数1: 目标主题
// 参数2: 触发元素 (可选，用于动画起点)
// 参数3: 动画选项 (可选)
handleThemeChange("dark", triggerElement, {
  duration: 500,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
});
```

#### 6. 自定义主题

要添加新主题，只需在 `src/styles/themes/variables.scss` 中的 `$themes` 变量中添加新的主题配置：

```scss
$themes: (
  light: (
    /* 亮色主题变量 */
  ),
  dark: (
    /* 暗色主题变量 */
  ),

  // 添加新主题
  purple:
    (
      --primary-color: #722ed1,
      --bg-color: #f9f0ff,
      --text-primary: #333333,
      // 其他变量...
    ),
);
```

### API 请求

#### 1. 创建 API 模块

在 `src/apis/modules` 目录下创建模块文件：

```typescript
// src/apis/modules/product.ts
import axiosInstance from "@/utils/http";
import type { RequestData } from "../types/common";

interface ProductParams {
  id: string;
  name: string;
}

// 获取产品列表
export const getProducts = (params: ProductParams) => {
  const requestData: RequestData<ProductParams> = {
    parameter: params,
  };
  return axiosInstance.post("/api/products", requestData);
};
```

#### 2. 导出 API 模块

在 `src/apis/index.ts` 中导出新模块：

```typescript
// src/apis/index.ts
export * as userApi from "./modules/user";
export * as scriptApi from "./modules/script";
export * as productApi from "./modules/product"; // 新增
```

#### 3. 使用 API

在组件中使用 API：

```typescript
// 方式1: 直接导入
import { getProducts } from "@/apis/modules/product";

// 方式2: 通过统一导出使用
import { productApi } from "@/apis";

const fetchData = async () => {
  try {
    // 方式1
    const res1 = await getProducts({ id: "1", name: "test" });

    // 方式2
    const res2 = await productApi.getProducts({ id: "1", name: "test" });

    console.log(res1, res2);
  } catch (error) {
    console.error(error);
  }
};
```

### 状态管理

#### 1. 创建 Store

在 `src/stores` 目录下创建新的 store：

```typescript
// src/stores/product.ts
import { defineStore } from "pinia";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
}

export const useProductStore = defineStore("productStore", {
  state: (): ProductState => ({
    products: [],
    loading: false,
  }),

  getters: {
    totalProducts: (state) => state.products.length,
    totalPrice: (state) =>
      state.products.reduce((sum, product) => sum + product.price, 0),
  },

  actions: {
    setProducts(products: Product[]) {
      this.products = products;
    },

    addProduct(product: Product) {
      this.products.push(product);
    },

    async fetchProducts() {
      this.loading = true;
      try {
        // 使用API获取数据
        const { data } = await productApi.getProducts({});
        this.setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },

  // 持久化配置
  persist: true,
});
```

#### 2. 使用 Store

在组件中使用 store：

```typescript
import { useProductStore } from "@/stores/product";

// 在setup中使用
const productStore = useProductStore();

// 读取状态
console.log(productStore.products);
console.log(productStore.totalProducts); // getter

// 修改状态
productStore.setProducts([...]);
productStore.addProduct({ id: "1", name: "Product 1", price: 99 });

// 调用异步action
productStore.fetchProducts();
```

### 路由管理

#### 1. 创建页面组件

在 `src/views` 目录下创建页面组件：

```vue
<!-- src/views/product/index.vue -->
<template>
  <div class="product-container">
    <h1>产品列表</h1>
    <div v-if="loading">加载中...</div>
    <ul v-else>
      <li v-for="item in products" :key="item.id">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { productApi } from "@/apis";

const products = ref([]);
const loading = ref(false);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const { data } = await productApi.getProducts({});
    products.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
```

#### 2. 创建路由模块

在 `src/router` 目录下创建路由模块：

```typescript
// src/router/product/productRouter.ts
const productRouter = [
  {
    path: "/products",
    name: "Products",
    component: () => import("@/views/product/index.vue"),
    meta: {
      requiresAuth: true,
      title: "产品列表",
    },
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: () => import("@/views/product/detail.vue"),
    meta: {
      requiresAuth: true,
      title: "产品详情",
    },
  },
];

export default productRouter;
```

#### 3. 注册路由模块

在主路由文件中引入并注册路由模块：

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import homeRouter from "./home/homeRouter";
import loginRouter from "./login/loginRouter";
import productRouter from "./product/productRouter"; // 新增

const routes = [
  // 其他路由...
  ...homeRouter,
  ...loginRouter,
  ...productRouter, // 注册产品路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### 环境变量配置

项目支持多环境配置，可以在根目录创建不同的环境变量文件：

- `.env` - 所有环境通用的变量
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量
- `.env.developmentH5` - H5 开发环境变量
- `.env.productionH5` - H5 生产环境变量

示例配置：

```bash
# .env.development
VITE_NODE_ENV=development
VITE_API_BASE_URL=/api
VITE_TEST_URL=http://dev-api.example.com
VITE_PRO_URL=http://api.example.com
```

在代码中使用环境变量：

```typescript
// 使用环境变量
const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log(`当前环境: ${import.meta.env.VITE_NODE_ENV}`);
```

### Vite 配置解析

项目的 `vite.config.ts` 提供了丰富的功能配置：

#### 1. 自动导入

无需手动导入 Vue API 和 UI 组件库：

```typescript
// 自动导入Vue API、Element Plus和Vant组件
AutoImport({
  imports: ["vue"], // 自动导入Vue API
  resolvers: [ElementPlusResolver(), VantResolver()],
});

// 自动导入组件
Components({
  resolvers: [ElementPlusResolver(), VantResolver()],
});
```

#### 2. 全局样式注入

自动为每个 SCSS 文件注入全局变量和混入：

```typescript
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @import "@/styles/themes/variables.scss";
        @import "@/styles/mixins/theme.scss";
        @import "@/styles/mixins/common.scss";
      `;
    }
  }
}
```

#### 3. SVG 图标系统

自动加载和优化 SVG 图标：

```typescript
createSvgIconsPlugin({
  iconDirs: [path.join(__dirname, "src/assets/icons/svg")],
  symbolId: "icon-[name]",
});
```

#### 4. 构建优化

智能代码分割和压缩：

```typescript
build: {
  minify: "terser",
  rollupOptions: {
    output: {
      manualChunks(id) {
        // 不同依赖库提取到独立的文件
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString();
        }
      }
    }
  }
}
```

#### 5. 路径别名

简化导入路径：

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@c': path.resolve(__dirname, 'src/components'),
    '@u': path.resolve(__dirname, 'src/utils')
  }
}
```

## 🧩 最佳实践

### 组件开发规范

1. **组件命名**: 使用 PascalCase 命名组件
2. **目录结构**: 复杂组件使用目录包含多个文件
3. **Props 类型**: 始终为 props 定义类型
4. **样式隔离**: 使用 scoped 或 module 确保样式隔离

```vue
<!-- 推荐的组件结构 -->
<template>
  <div class="product-card">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
// Props定义
interface Props {
  product: {
    id: string;
    name: string;
    price: number;
  };
  showDetails?: boolean;
}

// 默认值
const props = withDefaults(defineProps<Props>(), {
  showDetails: false,
});

// 事件
const emit = defineEmits<{
  (e: "select", id: string): void;
  (e: "delete", id: string): void;
}>();
</script>

<style lang="scss" scoped>
.product-card {
  @include flex(column, flex-start, stretch);

  // 使用主题变量
  color: var(--text-primary);
  background-color: var(--bg-color);
}
</style>
```

### API 开发规范

1. **模块化**: 按业务领域组织 API
2. **类型安全**: 为请求和响应定义类型
3. **注释**: 使用 JSDoc 注释 API 功能和参数
4. **错误处理**: 统一处理 API 错误

### 状态管理规范

1. **Store 拆分**: 按功能模块拆分 Store
2. **类型定义**: 为 State、Getters 和 Actions 定义类型
3. **持久化**: 根据需要配置持久化选项
4. **Action 复用**: 在 Action 中复用其他 Action

## 📝 许可证

[MIT](LICENSE)

## 👨‍💻 作者

- ZsTs119
- Email: zsts@foxmail.com
- GitHub: https://github.com/ZsTs119
