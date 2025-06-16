import { defineStore } from 'pinia'

interface TokenState {
  token?: string
  clientId?: string
  traceId?: string
}

export const useTokenStore = defineStore('tokenStore', {
  state: (): TokenState => ({
    token: undefined,
  }),

  getters: {
    isValid: (state) => !!state.token
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },
    clear() {
      this.token = undefined
      localStorage.removeItem('quick-token-store')
    }
  },

  persist: {
    key: 'quick-token-store',
    storage: localStorage
  }
}) 