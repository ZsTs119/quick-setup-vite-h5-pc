import { defineStore } from 'pinia'
import { useTokenStore } from './token'

interface UserInfo {
  id: number
  username: string
  [key: string]: any
}

interface UserState {
  userInfo?: UserInfo
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    userInfo: undefined
  }),

  getters: {
    isLoggedIn: (state) => {
      const tokenStore = useTokenStore()
      return !!state.userInfo && tokenStore.isValid
    }
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },

    clear() {
      this.userInfo = undefined
    },

    // 完整的登出操作
    logout() {
      const tokenStore = useTokenStore()
      this.clear()
      tokenStore.clear()
    }
  },

  persist: {
    key: 'user-store'
  }
}) 