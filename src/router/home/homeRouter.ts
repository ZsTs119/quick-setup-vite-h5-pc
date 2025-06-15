const homeRouter = [{
  path: '/',
  name: 'Home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    requiresAuth: true,
    title: '首页'
  }
}]

export default homeRouter;