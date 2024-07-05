import type { AppRouteRecordRaw } from '@router/types'

import { defineComponent } from 'vue'
import { useMenu } from '@hooks/useMenu'
import { ElAside, ElMenu, ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { SvgIcon } from '@components/Icon/index.ts'
import VueIcon from '@assets/vue.svg'

import 'element-plus/dist/index.css'
import './sider.scss'

export default defineComponent({
  name: 'RSider',
  setup() {
    const { getMenus, getCurrentPath } = useMenu()
    console.log(getMenus.value)
    console.log(typeof getMenus.value[0])

    const renderAppLogo = () => <div>AppLogo</div>
    const renderMenuItem = (item: AppRouteRecordRaw) => {
      console.log(item)
      return (
        <ElMenuItem index={item.path}>
          {item.meta && item.meta.iconName && (
            <ElIcon>
              {item.path === getCurrentPath.value ? (
                <SvgIcon name={item.meta.iconName} color={'#4a90E2'} />
              ) : (
                <SvgIcon name={item.meta.iconName} color={'#C0C0C0'} />
              )}
            </ElIcon>
          )}
          <span>{item.meta && item.meta.title}</span>
        </ElMenuItem>
      )
    }
    const renderSubMenu = (item: AppRouteRecordRaw) => {
      return (
        <ElSubMenu index={item.path}>
          <>
            <i class={`el-icon-${item.meta.iconName}`}></i>
            <span>{item.meta.title}</span>
          </>
          {item.children &&
            item.children.forEach(item => {
              renderMenuItem(item)
            })}
        </ElSubMenu>
      )
    }

    const renderMenu = (menus: AppRouteRecordRaw[], currentPath: string = '/') => {
      return (
        <ElMenu class={['menu']} defaultActive={getCurrentPath.value}>
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
        <h1>未实现的Sider</h1>
        <VueIcon />
      </ElAside>
    )
  },
})
