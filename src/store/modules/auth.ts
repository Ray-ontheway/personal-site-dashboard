import { defineStore } from 'pinia'
import { LoginResult } from '@/api/models/userModel'
import { UserApi } from '@/api/user'

type AuthState = LoginResult

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({ accessToken: '' }),
  getters: {
    getAccessToken(state: AuthState): string {
      return state.accessToken
    },
  },
  actions: {
    async doLogin(userLogin: UserLogin) {
      const loginResult = await UserApi.login(userLogin)
      this.accessToken = loginResult.accessToken
      this.expires = loginResult.expires
      console.log('doLogin', loginResult)
      console.log('doLogin', this.accessToken)
      console.log('doLogin', this.expires)
    },
  },
  persist: {
    key: 'auth',
    storage: window.sessionStorage,
  },
})
