import { defineStore } from 'pinia'

// 定义 store 的 state 类型
interface LoginState {
  // 这里添加你需要的状态属性
  token?: string
  clientId?: string,
  traceId?: string,
  userInfo?: {
    [key: string]: any
  }
}

export const useLoginStore = defineStore('loginStore', {
  state: (): LoginState => ({
    token: undefined,
    userInfo: undefined
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: LoginState['userInfo']) {
      this.userInfo = userInfo
    },
    logout() {
      this.token = undefined
      this.userInfo = undefined
    }
  },
  persist: true,
}) 