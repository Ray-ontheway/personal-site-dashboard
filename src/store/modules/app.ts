import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { routes } from '@/router/route'

interface AppState {
  routes: RouteRecordRaw[] | undefined
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({ routes: undefined }),
  getters: {
    getRoutes(state): RouteRecordRaw[] | undefined {
      return state.routes
    },
  },
  actions: {
    buildRoutes() {
      this.routes = routes
    },
  },
})
