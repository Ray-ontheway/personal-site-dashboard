import { AppRouteRecordRaw } from '@types/routes.ts'
import { RouteConstantEnum } from '@/enums/routeConstantEnum.ts'

const routes: AppRouteRecordRaw[] = [
  {
    name: 'Root',
    path: '/',
    redirect: '/dashboard',
    meta: { title: 'Root', hidden: true },
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: { title: RouteConstantEnum.DASHBOARD, iconName: 'dashboard' },
    component: () => import('@pages/dashboard.tsx'),
  },
  {
    name: 'Setting',
    path: '/sys',
    meta: { title: RouteConstantEnum.SYSTEM_MANAGEMENT, iconName: 'settings' },
    redirect: '/sys/user',
    children: [
      {
        name: 'UserManager',
        path: '/sys/user',
        meta: { title: RouteConstantEnum.USER_MANAGEMENT, iconName: 'user' },
        component: () => import('@pages/userManager.tsx'),
      },
    ],
  },
]

export { routes }
