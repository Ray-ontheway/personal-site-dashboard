import { defineStore } from 'pinia'
import { UserLogin, LoginResult } from '@/api/models/userModel'
import { UserApi } from '@/api/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

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
      try {
        const loginResult = await UserApi.login(userLogin)
        this.accessToken = loginResult.accessToken
        this.expireAt = Date.now() + loginResult.expires
        return Promise.resolve(loginResult)
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
  persist: {
    key: 'auth',
    // 使用 localStorage 作为持久化存储, 这样数据可以在多个标签页中使用，并长期有效
    storage: window.localStorage,
  },
})
