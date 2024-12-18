import { defineStore } from 'pinia'

interface TokenState {
  token?: string
  clientId?: string
  traceId?: string
}

export const useTokenStore = defineStore('tokenStore', {
  state: (): TokenState => ({
    token: undefined,
    clientId: undefined,
    traceId: undefined
  }),

  getters: {
    isValid: (state) => !!state.token
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },

    setClientInfo(clientId: string, traceId: string) {
      this.clientId = clientId
      this.traceId = traceId
    },

    clear() {
      this.token = undefined
      this.clientId = undefined
      this.traceId = undefined
    }
  },

  persist: {
    key: 'token-store'
  }
}) 