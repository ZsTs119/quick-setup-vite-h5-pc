import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import homeRouter from './home/homeRouter'
import loginRouter from './login/loginRouter'
import NProgress from '@/hooks/useNProgress'

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
  },
  //引入首页路由
  ...homeRouter,
  //引入登录路由
  ...loginRouter
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
