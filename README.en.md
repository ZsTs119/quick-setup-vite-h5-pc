# vue3-multi-platform

<div align="center">
  
![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen)
![Vite](https://img.shields.io/badge/Vite-5.2-646CFF)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.7-409eff)
![Vant](https://img.shields.io/badge/Vant-4.9-4fc08d)
![Pinia](https://img.shields.io/badge/Pinia-2.1-yellow)
![License](https://img.shields.io/badge/License-MIT-green)
![Multi-Platform](https://img.shields.io/badge/Multi--Platform-H5%2FPC-orange)
![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Support-black)
![Auto-Import](https://img.shields.io/badge/Auto--Import-Ready-lightblue)
![Theme System](https://img.shields.io/badge/Theme%20System-Customizable-purple)

</div>

<div align="center">

[English](./README.en.md) | [简体中文](./README.md)

</div>

> **Vue3 Multi-terminal Unified Development Framework - Quickly Build Cross-platform Applications, Saving time and effort.**

## 🚀 Features

- **Modern Tech Stack**: Vite 5.2 + Vue 3.5 + TypeScript 5.3 + Pinia 2.1
- **Multi-platform Adaptation**: One codebase for both H5 and PC platforms
- **UI Component Libraries**: Element Plus 2.7 (PC) + Vant 4.9 (Mobile)
- **Auto Import**: Component and API auto-import, no manual imports needed
- **Theme System**: Support for multiple themes with built-in dark mode
- **Permission Control**: Complete login authentication and permission management
- **State Management**: Pinia-based state management with persistence support
- **Request Encapsulation**: Axios request encapsulation, supporting both regular and streaming requests
- **Security Protection**: Built-in request signing and device fingerprint identification
- **Icon System**: SVG icons and Iconfront icon component encapsulation
- **Custom Hooks**: Common functionalities encapsulated as Hooks
- **Build Optimization**: Automatic code splitting, compression, and optimization
- **Cursor Rules**: Detailed project specification documentation, supporting Cursor AI development assistant to intelligently understand project architecture and development standards

## 📁 Directory Structure

```
src/
├── apis/                # API interfaces
│   ├── modules/        # APIs organized by modules
│   │   ├── user.ts     # User-related APIs
│   │   └── script.ts   # Script-related APIs
│   ├── types/          # API type definitions
│   └── index.ts        # Unified exports
├── assets/             # Static resources
│   └── icons/          # Icon resources
├── components/         # Public components
│   ├── SvgIcon/       # SVG icon component
│   ├── InconFent/     # Iconfront icon component
│   └── ThemeSwitch/   # Theme switch component
├── hooks/              # Custom Hooks
│   ├── useNProgress.ts # Progress bar Hook
│   └── useThemeTransition.ts # Theme transition animation Hook
├── router/             # Route configuration
│   ├── home/          # Home route module
│   ├── login/         # Login route module
│   └── index.ts       # Main route file
├── stores/             # State management
│   ├── theme.ts       # Theme state
│   ├── token.ts       # Token management
│   ├── user.ts        # User information
│   └── login.ts       # Login state
├── styles/             # Global styles
│   ├── themes/        # Theme-related
│   │   └── variables.scss # Theme variable definitions
│   ├── transitions/   # Transition animations
│   │   └── theme.scss # Theme switching animation
│   └── mixins/        # Style mixins
├── utils/             # Utility functions
│   ├── http/         # HTTP request encapsulation
│   ├── device.ts     # Device information
│   └── index.ts      # Utility unified exports
└── views/            # Page components
    ├── login/        # Login page
    ├── home/         # Home page
    ├── settings/     # Settings page
    └── error/        # Error page
```

## 📚 Project Specification Guide

The project incorporates seven core specifications to ensure consistency and high-quality code output during development:

### 1. Project Introduction Specification

The project is built on a modern frontend technology stack, with core technologies including:

- Vue 3.5.x, TypeScript 5.3.x, Vite 5.2.x
- State Management: Pinia 2.1.x (with persistence)
- UI Component Libraries: Element Plus 2.7.x (PC), Vant 4.9.x (Mobile)
- Utility Libraries: Axios, Lodash-es, TypeScript-MD5, etc.

### 2. Project Structure Specification

The project adopts a modular, hierarchical directory structure, mainly including:

- `apis`: API interface layer, organized by business modules
- `components`: Global public components
- `hooks`: Custom Hooks
- `router`: Route configuration, modular management
- `stores`: Pinia state management
- `styles`: Global styles and theme system
- `utils`: Utility functions
- `views`: Page components

### 3. API Usage Specification

API requests use unified encapsulation, including authentication, request signing, error handling, and other mechanisms:

- Request Process: Parameter Preparation → Authentication → Request Signing → Device Fingerprint → Request Sending → Response Processing
- API Definition Standards: Grouped by business modules, strict type definitions, unified naming conventions
- Support for both regular and streaming request methods

### 4. Code Comment Specification

Uses JSDoc-style commenting standards:

- Functions and Methods: Including description, parameter explanation, return value explanation, examples
- Classes and Interfaces: Including description, property explanation
- Complex Business Logic: Step-by-step explanation
- Special Handling or Edge Cases: Detailed explanation of reasons and processing methods

### 5. Core Hooks and Methods

The project encapsulates multiple core Hooks and utility methods:

- User Authentication and Permissions: `useUserStore`, `useTokenStore`
- Theme Management: `useThemeStore`, `useThemeTransition`
- HTTP Requests: Standard request and streaming request encapsulation
- Progress Bar: `useNProgress`
- Security Tools: Device fingerprint, request signing

### 6. New Module Specification

Standard process for adding new feature modules:

- Create API Module: Define interfaces, parameters, and response types
- Create View Components: Page components and private components
- Create Route Configuration: Define routes, permissions, and meta information
- Create State Management: Define State, Getters, and Actions

### 7. Code Style Specification

Based on Airbnb JavaScript Style Guide, combined with Vue Official Style Guide:

- Variables and References: Prefer const, use let when reassignment is needed
- Functions: Prefer arrow functions, use parameter default values
- Components: Use PascalCase naming, detailed Props definitions
- TypeScript: Strict type definitions, improve code readability
- Naming Conventions: Descriptive naming, follow naming conventions

## 🛠️ Quick Start

### Install Dependencies

```bash
pnpm install
```

### Development Environment

```bash
# PC development
pnpm dev

# H5 development
pnpm dev:h5
```

### Production Environment

```bash
# PC production environment
pnpm pro

# H5 production environment
pnpm proH5
```

### Build Project

```bash
# PC build (development environment)
pnpm build:dev

# H5 build (development environment)
pnpm build:dev:h5

# PC build (production environment)
pnpm build:prod

# H5 build (production environment)
pnpm build:prod:h5
```

## 📘 Development Guide

### Theme System

The project includes a powerful theme system, supporting multiple theme switching and smooth transition animations.

#### 1. Theme Configuration

Theme variables are defined in `src/styles/themes/variables.scss`:

```scss
// Basic variable definitions
$themes: (
  light: (
    // Light theme
    --primary-color: #409eff,
    --bg-color: #ffffff,
    --text-primary: #303133,
    // More variables...
  ),
  dark: (
    // Dark theme
    --primary-color: #409eff,
    --bg-color: #141414,
    --text-primary: #ffffff,
    // More variables...
  ),
  // You can add more custom themes...
  red:
    (
      --primary-color: #f56c6c,
      // Other variables for red theme...
    ),
);
```

#### 2. Using Theme Switch Component

Import the `ThemeSwitch` component in the page:

```vue
<template>
  <div class="container">
    <!-- Theme switch button -->
    <ThemeSwitch />

    <!-- Page content -->
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import { useThemeStore } from "@/stores/theme";

// Get theme state management instance
const themeStore = useThemeStore();

// Initialize theme on component mount
onMounted(() => {
  themeStore.initTheme();
});
</script>
```

#### 3. Applying Theme in Parent Container

Apply theme variables and transition animations in the parent container:

```vue
<template>
  <div class="app-container">
    <!-- Page content -->
  </div>
</template>

<style lang="scss">
// Import theme transition animation styles
@import "@/styles/transitions/theme.scss";

.app-container {
  // Use theme mixin
  @include useTheme;

  // Use theme variables
  background: var(--bg-color);
  color: var(--text-primary);
}
</style>
```

#### 4. Theme State Management

Use `useThemeStore` to manually control the theme:

```typescript
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

// Switch to dark theme
themeStore.setTheme("dark");

// Switch to light theme
themeStore.setTheme("light");

// Switch to custom theme
themeStore.setTheme("red");

// Toggle dark/light mode
themeStore.toggleDarkMode();

// Get current theme
console.log(themeStore.currentTheme);

// Check if dark mode
console.log(themeStore.isDarkMode);
```

#### 5. Theme Transition Animation

The project uses View Transitions API to implement smooth theme switching animations, encapsulated through the `useThemeTransition` Hook:

```typescript
import { useThemeTransition } from "@/hooks/useThemeTransition";

const { handleThemeChange } = useThemeTransition();

// Switch theme and apply transition animation
// Param 1: Target theme
// Param 2: Trigger element (optional, for animation starting point)
// Param 3: Animation options (optional)
handleThemeChange("dark", triggerElement, {
  duration: 500,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
});
```

#### 6. Custom Themes

To add a new theme, simply add a new theme configuration to the `$themes` variable in `src/styles/themes/variables.scss`:

```scss
$themes: (
  light: (
    /* Light theme variables */
  ),
  dark: (
    /* Dark theme variables */
  ),

  // Add new theme
  purple:
    (
      --primary-color: #722ed1,
      --bg-color: #f9f0ff,
      --text-primary: #333333,
      // Other variables...
    ),
);
```

### API Requests

#### 1. Creating API Module

Create a module file in the `src/apis/modules` directory:

```typescript
// src/apis/modules/product.ts
import axiosInstance from "@/utils/http";
import type { RequestData } from "../types/common";

interface ProductParams {
  id: string;
  name: string;
}

// Get product list
export const getProducts = (params: ProductParams) => {
  const requestData: RequestData<ProductParams> = {
    parameter: params,
  };
  return axiosInstance.post("/api/products", requestData);
};
```

#### 2. Exporting API Module

Export the new module in `src/apis/index.ts`:

```typescript
// src/apis/index.ts
export * as userApi from "./modules/user";
export * as scriptApi from "./modules/script";
export * as productApi from "./modules/product"; // New addition
```

#### 3. Using API

Use API in components:

```typescript
// Method 1: Direct import
import { getProducts } from "@/apis/modules/product";

// Method 2: Using unified export
import { productApi } from "@/apis";

const fetchData = async () => {
  try {
    // Method 1
    const res1 = await getProducts({ id: "1", name: "test" });

    // Method 2
    const res2 = await productApi.getProducts({ id: "1", name: "test" });

    console.log(res1, res2);
  } catch (error) {
    console.error(error);
  }
};
```

### State Management

#### 1. Creating Store

Create a new store in the `src/stores` directory:

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
        // Use API to get data
        const { data } = await productApi.getProducts({});
        this.setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },

  // Persistence configuration
  persist: true,
});
```

#### 2. Using Store

Use store in components:

```typescript
import { useProductStore } from "@/stores/product";

// Use in setup
const productStore = useProductStore();

// Read state
console.log(productStore.products);
console.log(productStore.totalProducts); // getter

// Modify state
productStore.setProducts([...]);
productStore.addProduct({ id: "1", name: "Product 1", price: 99 });

// Call async action
productStore.fetchProducts();
```

### Route Management

#### 1. Creating Page Component

Create page components in the `src/views` directory:

```vue
<!-- src/views/product/index.vue -->
<template>
  <div class="product-container">
    <h1>Product List</h1>
    <div v-if="loading">Loading...</div>
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

#### 2. Creating Route Module

Create a route module in the `src/router` directory:

```typescript
// src/router/product/productRouter.ts
const productRouter = [
  {
    path: "/products",
    name: "Products",
    component: () => import("@/views/product/index.vue"),
    meta: {
      requiresAuth: true,
      title: "Product List",
    },
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: () => import("@/views/product/detail.vue"),
    meta: {
      requiresAuth: true,
      title: "Product Detail",
    },
  },
];

export default productRouter;
```

#### 3. Registering Route Module

Import and register the route module in the main route file:

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import homeRouter from "./home/homeRouter";
import loginRouter from "./login/loginRouter";
import productRouter from "./product/productRouter"; // New addition

const routes = [
  // Other routes...
  ...homeRouter,
  ...loginRouter,
  ...productRouter, // Register product routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### Environment Variable Configuration

The project supports multiple environment configurations. You can create different environment variable files in the root directory:

- `.env` - Variables common to all environments
- `.env.development` - Development environment variables
- `.env.production` - Production environment variables
- `.env.developmentH5` - H5 development environment variables
- `.env.productionH5` - H5 production environment variables

Example configuration:

```bash
# .env.development
VITE_NODE_ENV=development
VITE_API_BASE_URL=/api
VITE_TEST_URL=http://dev-api.example.com
VITE_PRO_URL=http://api.example.com
```

Using environment variables in code:

```typescript
// Using environment variables
const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log(`Current environment: ${import.meta.env.VITE_NODE_ENV}`);
```

### Vite Configuration Analysis

The project's `vite.config.ts` provides rich functionality configuration:

#### 1. Auto Import

No need to manually import Vue API and UI component libraries:

```typescript
// Auto import Vue API, Element Plus, and Vant components
AutoImport({
  imports: ["vue"], // Auto import Vue API
  resolvers: [ElementPlusResolver(), VantResolver()],
});

// Auto import components
Components({
  resolvers: [ElementPlusResolver(), VantResolver()],
});
```

#### 2. Global Style Injection

Automatically inject global variables and mixins for each SCSS file:

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

#### 3. SVG Icon System

Automatically load and optimize SVG icons:

```typescript
createSvgIconsPlugin({
  iconDirs: [path.join(__dirname, "src/assets/icons/svg")],
  symbolId: "icon-[name]",
});
```

#### 4. Build Optimization

Intelligent code splitting and compression:

```typescript
build: {
  minify: "terser",
  rollupOptions: {
    output: {
      manualChunks(id) {
        // Extract different dependency libraries to separate files
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString();
        }
      }
    }
  }
}
```

#### 5. Path Aliases

Simplify import paths:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@c': path.resolve(__dirname, 'src/components'),
    '@u': path.resolve(__dirname, 'src/utils')
  }
}
```

## 🧩 Best Practices

### Component Development Standards

1. **Component Naming**: Use PascalCase to name components
2. **Directory Structure**: Complex components use directories containing multiple files
3. **Props Types**: Always define types for props
4. **Style Isolation**: Use scoped or module to ensure style isolation

```vue
<!-- Recommended component structure -->
<template>
  <div class="product-card">
    <!-- Component content -->
  </div>
</template>

<script setup lang="ts">
// Props definition
interface Props {
  product: {
    id: string;
    name: string;
    price: number;
  };
  showDetails?: boolean;
}

// Default values
const props = withDefaults(defineProps<Props>(), {
  showDetails: false,
});

// Events
const emit = defineEmits<{
  (e: "select", id: string): void;
  (e: "delete", id: string): void;
}>();
</script>

<style lang="scss" scoped>
.product-card {
  @include flex(column, flex-start, stretch);

  // Use theme variables
  color: var(--text-primary);
  background-color: var(--bg-color);
}
</style>
```

### API Development Standards

1. **Modularity**: Organize APIs by business domain
2. **Type Safety**: Define types for requests and responses
3. **Comments**: Use JSDoc comments for API functionality and parameters
4. **Error Handling**: Handle API errors uniformly

### State Management Standards

1. **Store Splitting**: Split Stores by functional modules
2. **Type Definition**: Define types for State, Getters, and Actions
3. **Persistence**: Configure persistence options as needed
4. **Action Reuse**: Reuse other Actions within Actions

## 📝 License

[MIT](LICENSE)

## 👨‍💻 Author

- ZsTs119
- Email: zsts@foxmail.com
- GitHub: https://github.com/ZsTs119
