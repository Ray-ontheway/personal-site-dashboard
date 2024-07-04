import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useMenu() {
  const appStore = useAppStore()

  const getMenus = computed(() => appStore.getRoutes)

  return {
    getMenus,
  }
}
