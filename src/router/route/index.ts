import { AppRouteRecordRaw } from '@router/types'

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
    meta: { title: 'Dashboard', iconName: 'dashboard', roles: ['admin'] },
    component: () => import('@pages/dashboard.tsx'),
  },
  {
    name: 'UserManager',
    path: '/user-manager',
    meta: { title: 'User Manager', iconName: 'user', roles: ['admin'] },
    component: () => import('@pages/userManager.tsx'),
  },
]

export { routes }
