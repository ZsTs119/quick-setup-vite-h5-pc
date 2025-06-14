import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 配置 NProgress
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

// 添加自定义样式
const style = document.createElement('style')
style.textContent = `
  #nprogress .bar {
    background: #e6492b !important; /* 使用CSS变量，支持主题切换 */
    height: 3px;
  }
  #nprogress .spinner-icon {
    border-top-color: #e6492b;
    border-left-color: #e6492b;
  }
  #nprogress .peg {
    box-shadow: none;
  }
`
document.head.appendChild(style)

// 定义路由元信息类型
interface CustomRouteMetaData {
  requiresAuth?: boolean      // 是否需要登录
  title?: string            // 页面标题
}

// 扩展 RouteMeta 接口
declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMetaData { }
}

// 定义路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      requiresAuth: false,
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      requiresAuth: true,
      title: '首页'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/settings/index.vue'),
    meta: {
      requiresAuth: true,
      title: '系统设置'
    }
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      requiresAuth: false,
      title: '404'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  document.title = to.meta.title || 'Vue App'

  // 检查该路由是否需要登录权限
  if (to.meta.requiresAuth) {
    if (!userStore.isLoggedIn) {
      // 未登录，重定向到登录页
      next({
        path: '/login'
      })
      return
    }
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    // 已登录用户访问登录页，重定向到首页
    next({ path: '/' })
    return
  }
  // 允许访问
  NProgress.start();
  // 允许访问
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计等逻辑
  NProgress.done();
})

export default router
