# quick-setup-vite-h5-pc

一个基于 Vite + Vue3 + TypeScript 的多端应用开发脚手架，支持 H5 和 PC 端开发。

## 特性

- 🚀 Vite + Vue3 + TypeScript 开发
- 📱 支持 H5 和 PC 端适配
- 🔐 完整的登录权限控制（支持手机验证码和二维码登录）
- 📦 Pinia 状态管理（Token 和用户信息分离设计）
- 🎨 Element Plus 和 Vant UI 组件库
- 🔄 Axios 请求封装（统一错误处理）
- 🎯 TypeScript 类型安全
- 📝 ESLint + Prettier 代码规范
- 🎁 SVG 图标组件封装
- 🌈 多主题支持（Less/Scss 双版本实现）

## 目录结构

```
src/
├── apis/                # API 接口
│   ├── types/          # 接口类型定义
│   │   └── index.ts
│   ├── user.ts         # 用户相关接口
│   └── index.ts        # API 统一导出
├── assets/             # 静态资源
│   └── icons/          # 图标资源
│       └── svg/        # SVG 图标
├── components/         # 公共组件
│   ├── SvgIcon/       # SVG 图标组件
│   └── ThemeSwitch/   # 主题切换组件
├── router/             # 路由配置
│   └── index.ts
├── stores/             # 状态管理
│   ├── theme.ts       # 主题状态
│   ├── token.ts       # Token 管理
│   └── user.ts        # 用户信息管理
├── styles/             # 全局样式
│   ├── themes/        # 主题相关
│   │   ├── variables.scss
│   │   └── variables.less
│   ├── mixins/        # 混入
│   │   ├── theme.scss
│   │   ├── theme.less
│   │   ├── common.scss
│   │   └── common.less
│   ├── theme.less     # 主题入口
│   └── index.less     # 样式入口
├── utils/             # 工具函数
│   ├── http/         # HTTP 请求封装
│   │   └── index.ts
│   ├── encrypt.ts    # 加密相关
│   └── index.ts      # 工具统一导出
└── views/            # 页面组件
    ├── login/        # 登录页面
    ├── home/         # 首页
    └── error/        # 错误页面
```

## 核心功能

### 状态管理

采用 Token 和用户信息分离的设计：

```typescript
// Token 管理
import { useTokenStore } from '@/stores/token'
const tokenStore = useTokenStore()

// 设置认证信息
tokenStore.setToken('your-token')
tokenStore.setClientInfo('clientId', 'traceId')

// 用户信息管理
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// 设置用户信息
userStore.setUserInfo({
  id: 1,
  username: 'user'
})

// 登出（同时清除 token 和用户信息）
userStore.logout()
```

### 登录认证

支持多种登录方式：

1. **手机验证码登录**：
```typescript
// 发送验证码
const result = await getPhoneCode(phone)

// 手机登录
const result = await phoneLogin({
  phone: '13800138000',
  code: '123456'
})
```

2. **二维码扫码登录**：
```typescript
// 获取二维码
const result = await getLoginQRCode()

// 检查扫码状态
const result = await qrcodeLogin({
  qrCode: 'qrcode-value'
})
```

### API 使用示例

```typescript
// 1. API 定义
// src/apis/user.ts
export const phoneLogin = (params: PhoneLoginParams) => {
  const requestData: RequestData<PhoneLoginParams> = {
    parameter: params
  }
  return axiosInstance.post<LoginResponse>('/api/user/phone-login', requestData)
}

// 2. 在组件中使用
import { phoneLogin, getPhoneCode } from '@/apis/user'

// 发送验证码
const handleSendCode = async () => {
  try {
    const { data } = await getPhoneCode(phone.value)
    ElMessage.success('验证码发送成功')
  } catch (error) {
    ElMessage.error('验证码发送失败')
  }
}

// 登录请求
const handleLogin = async () => {
  try {
    const { data: result } = await phoneLogin({
      phone: phone.value,
      code: code.value
    })
    
    // 存储认证信息
    tokenStore.setToken(result.token)
    userStore.setUserInfo(result)
    
    ElMessage.success('登录成功')
  } catch (error) {
    ElMessage.error('登录失败')
  }
}
```

### 请求封装

统一的请求处理：

```typescript
// 请求拦截器自动添加认证信息
{
  token: tokenStore.token,
  clientId: tokenStore.clientId,
  traceId: tokenStore.traceId
}

// 响应拦截器自动处理登录过期
if (code === 10001) {
  userStore.logout()
  router.push('/login')
}
```

### 路由权限

基于登录状态的路由控制：

```typescript
{
  path: '/settings',
  meta: {
    requiresAuth: true,    // 需要登录
    title: '系统设置'      // 页面标题
  }
}
```

### 主题系统

支持 Less 和 Scss 两种实现方式：

```vue
<style lang="scss" scoped>
.my-component {
  // 直接使用主题混入
  @include useTheme;
  
  // 直接使用CSS变量
  color: var(--text-primary);
  background-color: var(--bg-color);
}
</style>

<!-- 或使用 Less -->
<style lang="less" scoped>
.my-component {
  // 直接使用主题混入
  .use-theme();
  
  // 直接使用CSS变量
  color: var(--text-primary);
  background-color: var(--bg-color);
}
</style>
```

### 通用样式混入

提供常用的样式混入：

```scss
// Flex 布局
@include flex(column, center, center);

// 文本溢出
@include text-ellipsis(2);

// 滚动条样式
@include scrollbar(8px);

// 阴影效果
@include box-shadow('light');
```

## 开发规范

### TypeScript 规范

- 统一使用 interface 定义对象类型
- API 请求和响应必须有类型定义
- 避免使用 any 类型
- 合理使用类型推导

### 样式规范

- 优先使用提供的混入函数
- 遵循 BEM 命名规范
- 使用 CSS 变量实现主题切换
- 合理使用预处理器特性

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
