//引入createApp创建应用
import { createApp } from 'vue'
//引入APP根组件
import App from './App.vue'
//引入svg组件
//svg插件需要配置代码
import 'virtual:svg-icons-register';
import SvgIcon from './components/SvgIcon/index.vue'; // SVG 图标组件
//引入inconfent组件
import InconFent from './components/InconFent/index.vue'; // inconfent网站图标组件
//引入路由器
import router from './router'
//引入pinia
import { createPinia } from "pinia"
//引入pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//创建一个应用
const app = createApp(App)
// 注册 SvgIcon 为全局组件
app.component('svg-icon', SvgIcon);
// 注册 SvgIcon 为全局组件
app.component('incon-fent', InconFent);
//创建pinia
const pinia = createPinia()
//使用pinia持久化插件
pinia.use(piniaPluginPersistedstate as any)
//使用路由器
//使用pinia
app.use(router).use(pinia)
// 访问根实例
app.mount('#app') 