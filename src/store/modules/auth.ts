import { defineStore } from 'pinia'
import { UserLogin, LoginResult } from '@/api/models/userModel'
import { UserApi } from '@/api/user'

interface AuthState {
  accessToken: string
  expireAt: number
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({ accessToken: '', expireAt: 0 }),
  getters: {
    getAccessToken(state: AuthState): string {
      return state.accessToken
    },
    isValid(state: AuthState): boolean {
      return state.expireAt > Date.now()
    },
    isAuthenticated(state: AuthState): boolean {
      return !!state.accessToken && this.isValid
    },
  },
  actions: {
    async doLogin(userLogin: UserLogin) {
      const loginResult = await UserApi.login(userLogin)
      this.accessToken = loginResult.accessToken
      this.expireAt = Date.now() + loginResult.expires
    },
  },
  persist: {
    key: 'auth',
    storage: window.sessionStorage,
  },
})
