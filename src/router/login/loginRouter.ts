const loginRouter = [{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    requiresAuth: false,
    title: '登录'
  }
}]

export default loginRouter;