import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useLoginStore } from '@/stores/login'

// 定义路由元信息类型
interface CustomRouteMetaData {
  requiresAuth?: boolean      // 是否需要登录
  roles?: string[]           // 允许访问的角色
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
      roles: ['admin'],  // 只有 admin 角色可以访问
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
  const loginStore = useLoginStore()

  // 设置页面标题
  document.title = to.meta.title || 'Vue App'

  // 检查该路由是否需要登录权限
  if (to.meta.requiresAuth) {
    if (!loginStore.isLoggedIn) {
      // 未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 保存原目标路径
      })
      return
    }

    // 检查角色权限
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = loginStore.userInfo?.role
      if (!userRole || !to.meta.roles.includes(userRole)) {
        // 无权限访问
        next({
          path: '/',
          replace: true
        })
        return
      }
    }
  } else if (to.path === '/login' && loginStore.isLoggedIn) {
    // 已登录用户访问登录页，重定向到首页
    next({ path: '/' })
    return
  }

  // 允许访问
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计等逻辑
})

export default router
