<script lang="tsx">
import { defineComponent, toRefs, ref, PropType } from 'vue'
import RSearch from '@/components/search'
import { ElButton } from 'element-plus'

export interface MenuData {
  id: string
  name: string
  path: string
}

/**
 * - Menu -- 分类用
 *   - 显示分类
 *   - 点击切换分类
 * - 搜索框
 *   - 通过回车输入
 * - 按键
 *   - 设置按键文字
 *   - 点击时间
 */
export default defineComponent({
  name: 'ArticleHeader',
  props: {
    menuData: {
      type: Array as PropType<MenuData[]>,
      required: true,
    },
    defaultPath: {
      type: String as PropType<string>,
      required: true,
    },
    btnText: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['menu-click', 'search', 'btn-click'],
  setup(props, { emit }) {
    const { menuData, btnText } = toRefs(props)
    const activePathRef = ref(props.defaultPath)
    const isActive = (path: string) => {
      return activePathRef.value === path
    }

    const handleMenuItemClick = (menuItem: MenuData) => {
      activePathRef.value = menuItem.path
      emit('menu-click', menuItem)
    }
    const handleSearch = (searchText: string) => {
      emit('search', searchText)
    }
    const handleBtnClick = () => {
      emit('btn-click')
    }
    const renderMenuItem = (menuItem: MenuData) => {
      return (
        <>
          <li
            class={['header-menu-item', isActive(menuItem.path) ? 'active' : '']}
            onClick={() => handleMenuItemClick(menuItem)}
          >
            <div class="">{menuItem.name}</div>
          </li>
        </>
      )
    }

    const renderMenu = () => {
      return (
        <>
          <nav class="article-header-menu">
            <ul>{menuData.value && menuData.value.map(menuItem => renderMenuItem(menuItem))}</ul>
          </nav>
        </>
      )
    }

    const renderSearch = () => {
      return (
        <>
          <RSearch class="article-header-search" on-search={handleSearch} />
        </>
      )
    }
    const renderBtn = () => {
      return (
        <>
          <ElButton type="primary" class="article-header-btn" onClick={handleBtnClick}>
            {btnText.value}
          </ElButton>
        </>
      )
    }
    return () => (
      <>
        <div class={['article-header-container']}>
          {renderMenu()}
          {renderSearch()}
          {renderBtn()}
        </div>
      </>
    )
  },
})
</script>
<style lang="scss" scoped>
.article-header-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  height: 6.4rem;
  font-size: 1.8rem;
  border-bottom: 0.1rem solid black;
}

nav {
  flex: 1;
  height: 100%;

  ul {
    display: flex;
    flex: 1;
    gap: 2rem;
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      height: 100%;

      &.active {
        z-index: 10;
        color: #409eff;
        border-bottom: 0.3rem solid #409eff;
      }
    }
  }
}

.header-menu-item {
  display: flex;
  align-items: center;
  justify-self: center;
  height: 100%;
  color: black;
  text-align: center;
  cursor: pointer;
}

.article-header-search {
  padding: 0.5rem 2rem;
  color: black;
  cursor: pointer;
}

.article-header-btn {
  padding: 0.5rem 2rem;
  color: black;
  cursor: pointer;
}
</style>
