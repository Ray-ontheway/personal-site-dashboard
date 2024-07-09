import type { AppRouteRecordRaw } from '@router/types'

import { defineComponent } from 'vue'
import { useMenu } from '@hooks/useMenu'
import { ElAside, ElMenu, ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { AppLogo } from '@components/application'
import { SvgIcon } from '@components/Icon/index.ts'
import VueIcon from '@assets/vue.svg'

import 'element-plus/dist/index.css'
import './sider.scss'

export default defineComponent({
  name: 'RSider',
  setup() {
    const { getMenus, getCurrentPath } = useMenu()
    const renderAppLogo = () => <AppLogo />

    const renderMenuItem = (item: AppRouteRecordRaw) => {
      return (
        <ElMenuItem index={item.path} class={['menu-item']}>
          {item.meta && item.meta.iconName && (
            <ElIcon>
              <SvgIcon name={item.meta.iconName} color={item.path === getCurrentPath.value ? '#4a90E2' : 'c0c0c0'} />
            </ElIcon>
          )}
          <span class={['menu-text']}>{item.meta && item.meta.title}</span>
        </ElMenuItem>
      )
    }

    const renderSubMenu = (item: AppRouteRecordRaw) => {
      return (
        <ElSubMenu
          class={['menu-item']}
          index={item.path}
          v-slots={{
            title: () => (
              <>
                <ElIcon>
                  <SvgIcon name={item.meta.iconName} color={item.path === getCurrentPath.value ? '#4a90E2' : 'c0c0c0'} />
                </ElIcon>
                <span class={['menu-text']}>{item.meta.title}</span>
              </>
            ),
          }}
        >
          {item.children.map(curItem => renderMenuItem(curItem))}
        </ElSubMenu>
      )
    }

    const renderMenu = (menus: AppRouteRecordRaw[], currentPath: string = '/') => {
      return (
        <ElMenu class={['menu']} defaultActive={getCurrentPath.value} router={true}>
          {menus.map(item => {
            if (item.children && item.children.length > 0) {
              return renderSubMenu(item)
            }
            return renderMenuItem(item)
          })}
        </ElMenu>
      )
    }

    return () => (
      <ElAside class={['aside']} width={'200px'}>
        {renderAppLogo()}
        {getMenus.value && getMenus.value.length > 0 && renderMenu(getMenus.value, getCurrentPath.value)}
      </ElAside>
    )
  },
})
