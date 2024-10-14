import { defineStore } from 'pinia'
import { routes } from '@/router/route'
import { AppRouteRecordRaw } from '@router/types'
import { UserLogin } from '@/api/models/userModel'
import { get } from 'lodash'
import { UserApi } from '@/api/user'

interface AppState {
  routes: AppRouteRecordRaw[] | undefined
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({ routes: undefined }),
  getters: {
    getRoutes(state: AppState): AppRouteRecordRaw[] | undefined {
      return state.routes
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
  },
})
