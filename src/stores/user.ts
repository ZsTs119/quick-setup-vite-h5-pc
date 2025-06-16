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
    updateUserInfo(key: keyof UserInfo, value: any) {
      if (this.userInfo) {
        this.userInfo[key] = value;
      } else {
        this.userInfo = { [key]: value } as UserInfo;
      }
    },
    clear() {
      this.userInfo = undefined;
      // 确保清除本地存储中的数据
      localStorage.removeItem('quick-user-store');
    },

    // 完整的登出操作
    logout() {
      const tokenStore = useTokenStore();
      this.clear();
      tokenStore.clear();
      
      // 额外确保所有相关的存储都被清除
      localStorage.removeItem('quick-user-store');
      localStorage.removeItem('quick-token-store');
      
      // 可以考虑添加一个小延迟，确保存储被清除后再跳转
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    }
  },

  persist: {
    key: 'quick-user-store',
    storage: localStorage
  }
}) 