//创建路由器暴露出去

//第一步：引入createRouter和对应路由工作模式
import { createRouter , createWebHistory } from "vue-router";
//引入组件

//第二步：创建路由器
const router = createRouter({
  history:createWebHistory(),
  routes: [
   
  ]
})
//第三步暴露出去
export default router