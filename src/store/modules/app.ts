import { defineStore } from 'pinia'
import { routes } from '@/router/route'
import { AppRouteRecordRaw } from '@router/types'
import { UserLogin } from '@/api/models/userModel'
import { get } from 'lodash'

interface AppState {
  routes: AppRouteRecordRaw[] | undefined
  accessToken: string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({ routes: undefined, accessToken: '' }),
  getters: {
    getRoutes(state: AppState): AppRouteRecordRaw[] | undefined {
      return state.routes
    },
    getAccessToken(state: AppState): string {
      return state.accessToken
    },
  },
  actions: {
    buildRoutes() {
      const doFilter = (route: AppRouteRecordRaw): boolean => {
        if (route.meta?.hidden === true) {
          return false
        }
        return true
      }
      this.routes = routes.filter(item => doFilter(item))
    },

    async doLogin(userLogin: UserLogin) {
      const loginResult = await this.$api.user.login(userLogin)
    },
  },
})
