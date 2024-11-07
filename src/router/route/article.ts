import { AppRouteRecordRaw } from '../types.ts'
import { RouteConstantEnum } from '@/enums/routeConstantEnum.ts'
import BaseLayout from '@/layouts/index.ts'

export const articleListRoutes: AppRouteRecordRaw[] = [
  {
    name: 'ArticleEssays',
    path: '/article/list/essays',
    meta: { title: '已发表', iconName: 'list', hidden: true, requiresAuth: true },
    component: () => import('@/pages/article/articleEssays.vue'),
  },
  {
    name: 'ArticleDrafts',
    path: '/article/list/drafts',
    meta: { title: '草稿', iconName: 'list', hidden: true, requiresAuth: true },
    component: () => import('@/pages/article/articleDrafts.vue'),
  },
]
export const articleListRoute: AppRouteRecordRaw = {
  name: 'ArticleList',
  path: '/article/list',
  meta: { title: '文章列表', iconName: 'list', requiresAuth: true },
  component: () => import('@/pages/article/ArticlePager.vue'),
  redirect: '/article/list/essays',
  children: articleListRoutes,
}

export const articleTagsRoutes: AppRouteRecordRaw[] = [
  {
    name: 'ArticleType',
    path: '/article/tags/type',
    meta: { title: '类型', hidden: true, iconName: 'type', requiresAuth: true },
    component: () => import('@/pages/article/ArticleTypes.vue'),
  },
  {
    name: 'ArticleTag',
    path: '/article/tags/tag',
    meta: { title: '标签', hidden: true, iconName: 'type' },
    component: () => import('@/pages/article/ArticleTags.vue'),
  },
]
export const articleTagsRoute: AppRouteRecordRaw = {
  name: 'ArticleTags',
  path: '/article/tags',
  meta: { title: '文章标签', iconName: 'type' },
  component: () => import('@/pages/article/ArticlePager.vue'),
  redirect: '/article/tags/type',
  children: articleTagsRoutes,
}

export const articleRoute: AppRouteRecordRaw = {
  name: 'Articles',
  path: '/article',
  meta: { title: RouteConstantEnum.ARTICLE_MANAGEMENT, iconName: 'ph:article-medium-fill', requiresAuth: true },
  component: BaseLayout,
  redirect: '/article/list',
  children: [articleListRoute, articleTagsRoute],
}

export const articleEditorRoute: AppRouteRecordRaw = {
  name: 'ArticleEditor',
  path: '/article/editor',
  meta: { title: '文章编辑', hidden: true, iconName: 'edit', requiresAuth: true },
  component: () => import('@/pages/article/articleEditor.vue'),
}
