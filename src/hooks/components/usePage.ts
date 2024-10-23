import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { AppRouteRecordRaw } from '@/router/types'
import { articleTagsRoute, articleListRoute } from '@router/route/article'
import { routes } from '@router/route'
import { useMenu } from '../useMenu'

export interface TabItem {
  path: string
  name: string
  title: string
}

const transformRouteToTab = (routes: AppRouteRecordRaw[]): TabItem[] =>
  routes.map(route => ({
    path: route.path,
    name: route.name,
    title: route.meta.title,
  }))

export const usePage = () => {
  const route = useRoute()
  const { getCurrentPath } = useMenu()

  const pageTitle = computed(() => {
    let title = ''
    const findPathName = (allRoutes: AppRouteRecordRaw[], path: string) => {
      allRoutes.forEach(route => {
        if (route.path === path) {
          title = route.meta.title
        }
        if (route.children && route.children.length > 0) {
          findPathName(route.children, path)
        }
      })
    }
    findPathName(routes, getCurrentPath.value)
    return title
  })

  const currentPageTabs = computed(() => {
    if (getCurrentPath.value.includes(articleTagsRoute.path)) {
      return transformRouteToTab(articleTagsRoute.children)
    } else if (getCurrentPath.value.includes(articleListRoute.path)) {
      return transformRouteToTab(articleListRoute.children)
    }
    return []
  })

  const currentTab = computed(() => {
    return {
      path: route.path,
      name: route.name as string,
      title: route.meta.title,
    }
  })

  return {
    pageTitle,
    currentPageTabs,
    currentTab,
  }
}
