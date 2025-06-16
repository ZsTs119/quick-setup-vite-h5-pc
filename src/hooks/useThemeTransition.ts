import { useThemeStore } from '@/stores/theme'

interface ViewTransitionDocument extends Document {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

export const useThemeTransition = () => {
  const themeStore = useThemeStore()

  const handleThemeChange = async (
    command: 'light' | 'dark',
    triggerElement?: Element | null,
    options = {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  ) => {
    const doc = document as ViewTransitionDocument

    // 如果浏览器不支持 View Transitions API，直接切换主题
    if (!doc.startViewTransition) {
      themeStore.setTheme(command)
      return
    }

    // 获取动画起点
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    // 开始过渡动画
    const transition = doc.startViewTransition(() => {
      themeStore.setTheme(command)
    })

    try {
      // 等待动画准备就绪
      await transition.ready

      // 计算动画半径
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      // 定义裁剪路径
      const clipPath = [
        `circle(0% at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`
      ]

      // 应用动画
      document.documentElement.animate(
        {
          clipPath: command === 'dark' ? clipPath.reverse() : clipPath
        },
        {
          duration: options.duration,
          easing: options.easing,
          pseudoElement: command === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      )

      await transition.finished
    } catch (error) {
      console.error('Theme transition failed:', error)
    }
  }

  return {
    handleThemeChange
  }
} 