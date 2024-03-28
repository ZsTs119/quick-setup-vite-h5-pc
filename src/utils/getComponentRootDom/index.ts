import {createApp } from "vue"
/**
 * @param {.vue} comp 传入的模板.vue文件
 * @param {object} props 模板.vue文件需要的数据属性
 */
//获取某个组件渲染的DOM元素
export default function (comp: any, props: any): any {
  const dom = document.createDocumentFragment() as any
  const vm = createApp(comp, props).mount(dom) 
  console.log('vm',vm,vm.$)
  return vm.$el
}