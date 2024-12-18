import { defineStore } from 'pinia'

export type ThemeType = 'light' | 'dark' | 'red' | 'purple'

interface ThemeState {
  currentTheme: ThemeType
  isDarkMode: boolean
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: 'light',
    isDarkMode: false
  }),
  
  actions: {
    setTheme(theme: ThemeType) {
      this.currentTheme = theme
      document.documentElement.setAttribute('data-theme', theme)
      // 保存主题设置到本地存储
      localStorage.setItem('theme', theme)
    },
    
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.setTheme(this.isDarkMode ? 'dark' : 'light')
    },
    
    // 初始化主题
    initTheme() {
      const savedTheme = localStorage.getItem('theme') as ThemeType
      if (savedTheme) {
        this.setTheme(savedTheme)
      } else {
        // 根据系统主题自动设置
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.setTheme(prefersDark ? 'dark' : 'light')
      }
    }
  },
  
  persist: true
}) 