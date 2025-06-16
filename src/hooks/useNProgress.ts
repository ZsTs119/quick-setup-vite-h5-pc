import NProgress from "nprogress";
import "nprogress/nprogress.css";

/**
 * 进度条配置和样式设置Hook
 * @returns 配置好的NProgress实例
 */
export const useNProgress = () => {
  // 配置 NProgress
  NProgress.configure({
    easing: "ease", // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
  });

  // 添加自定义样式
  const style = document.createElement('style');
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
  `;
  document.head.appendChild(style);

  return NProgress;
};

// 默认导出配置好的NProgress实例
export default useNProgress(); 