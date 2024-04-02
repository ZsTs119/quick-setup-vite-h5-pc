##quick-setup-vite-h5-pc 是什么

- 一个专门对 vite 配置的一款即插即用的脚手架
- 针对 h5 和 pc 场景有分别的命令行启动

##quick-setup-vite-h5-pc 有哪些配置

- Vue 3 单文件组件支持
- 允许在 setup 函数中使用 name 属性来指定组件的名称
- 自动导入 Element Plus 和 Vant 组件及样式
- 自动导入 Vue Api，如 ref, reactive, computed 等
- 生产环境下的打包分析工具
- SVG 图标加载
- 只打包项目中实际用到的SVG图标
- 对所有静态资源做 gzip 压缩
- 生产环境下优化图像资源
- 代码压缩和优化
- 自定义输出文件名格式
- 拆分 chunk
- 转换 CommonJS 模块为 ESM
- 关闭 sourcemap 生成
- 生成 manifest.json 文件
- 设置 chunk 大小警告限制
- 关闭brotli压缩大小提示因为耗费性能
- 开发服务器配置和代理
- 设置别名
- 全局 SCSS 变量注入
- 全局 LESS 变量注入

##quick-setup-vue-cli-h5-pc 其他功能

- 项目全局封装了 incon-fent 组件，使用方式引入 inconfent 个人图标库的 css 地址，在配置 fontNameMap 对象即可。在直接使用<incon-fent type="图标名" />
- 项目全局封装了 svg-icon 组件，使用方式将 svg 放到 assets/icons/svg 文件夹里。在直接使用<svg-icon icon-class="svg名"/>

##有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

- 邮件(zsts@foxmail.com)

##捐助开发者
在兴趣的驱动下,写一个`免费`的东西，有欣喜，也还有汗水，希望你喜欢我的作品，同时也能支持一下。

##关于作者

```javascript
var ihubo = {
  nickName: "ZsTs119",
  site: "https://github.com/ZsTs119",
};
```
