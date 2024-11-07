import { defineStore } from 'pinia'
import { routes } from '@/router/route'
import { AppRouteRecordRaw } from '@router/types'

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
        if (route.children) {
          route.children = route.children.filter(item => doFilter(item))
        }
        return true
      }
      this.routes = routes.filter(item => doFilter(item))
    },
  },
})
