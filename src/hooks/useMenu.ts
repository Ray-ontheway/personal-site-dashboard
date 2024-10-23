import { useAppStore } from '@/store/modules/app'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useMenu() {
  const appStore = useAppStore()

  const route = useRoute()

  const getCurrentPath = computed(() => {
    let curPath = '/'
    appStore.getRoutes.forEach(it => {
      // TODO 临时用一用, 目前的设计是，只有两级菜单
      if (route.path.includes(it.path)) {
        if (it.children && it.children.length > 0) {
          it.children.forEach(child => {
            if (route.path.includes(child.path)) {
              curPath = child.path
            }
          })
        } else {
          curPath = it.path
        }
      }
    })
    return curPath
  })
  const getMenus = computed(() => appStore.getRoutes)

  return {
    getCurrentPath,
    getMenus,
  }
}
