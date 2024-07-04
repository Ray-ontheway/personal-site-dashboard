import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: { title: 'Dashboard' },
    component: () => import('@pages/dashboard.tsx'),
  },
  {
    name: 'UserManager',
    path: '/user-manager',
    meta: { title: 'User Manager' },
    component: () => import('@pages/userManager.tsx'),
  },
]

export { routes }
