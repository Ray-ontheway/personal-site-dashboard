import { AppRouteRecordRaw } from '../types.ts'
import { RouteConstantEnum } from '@/enums/routeConstantEnum.ts'
import BaseLayout from '@/layouts/index.ts'

import { articleRoute, articleEditorRoute } from './article.ts'

const routes: AppRouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    redirect: '/dashboard',
    meta: { title: 'Root', hidden: true, iconName: '' },
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: { title: RouteConstantEnum.DASHBOARD, iconName: 'tabler:layout-dashboard-filled' },
    component: BaseLayout,
    redirect: '/dashboard/analysis',
    children: [
      {
        name: 'Analysis',
        path: '/dashboard/analysis',
        meta: { title: '分析页', iconName: 'analysis', requiresAuth: true },
        component: () => import('@pages/dashboard/Dashboard.vue'),
      },
    ],
  },
  {
    name: 'Setting',
    path: '/sys',
    meta: { title: RouteConstantEnum.SYSTEM_MANAGEMENT, iconName: 'settings', hidden: true },
    component: BaseLayout,
    redirect: '/sys/user',
    children: [
      {
        name: 'UserManager',
        path: '/sys/user',
        meta: { title: RouteConstantEnum.USER_MANAGEMENT, iconName: 'user', requiresAuth: true },
        component: () => import('@pages/user/index.tsx'),
      },
    ],
  },
  articleRoute,
  {
    name: 'Tools',
    path: '/tools',
    meta: { title: RouteConstantEnum.TOOLS, iconName: 'fluent:window-dev-tools-24-filled', hidden: true },
    redirect: '/tools/wallet',
    component: BaseLayout,
    children: [
      {
        name: 'Wallet',
        path: '/tools/wallet',
        meta: { title: RouteConstantEnum.TOOLS_WALLET, iconName: 'wallet', requiresAuth: true },
        component: () => import('@pages/tools/ledger/WalletPage.vue'),
      },
    ],
  },
  articleEditorRoute,
  {
    name: 'Login',
    path: '/login',
    meta: { title: '登录', hidden: true, iconName: '' },
    component: () => import('@pages/sys/Login.vue'),
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    meta: { title: RouteConstantEnum.NOT_FOUND, hidden: true, iconName: '' },
    component: () => import('@pages/sys/NotFound.vue'),
  },
]

export { routes }
