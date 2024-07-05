import { useAppStore } from '@/store/modules/app'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useMenu() {
  const appStore = useAppStore()

  const route = useRoute()
  const getCurrentPath = computed(() => route.path)
  const getMenus = computed(() => appStore.getRoutes)

  return {
    getCurrentPath,
    getMenus,
  }
}
