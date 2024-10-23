<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { ElButton, ElInput, ElMenu, ElMenuItem, ElDialog } from 'element-plus'
import { useArticleManager } from './useArticle'
import CategoryItem from './components/articleCategoryItem.vue'
import ArticleCategoryEditor from './components/articleCategoryEditor.vue'

export default defineComponent({
  name: 'ArticleCategory',
  setup() {
    const { currentArticleCategories, fetchArticleCategoryByUserId } = useArticleManager()

    fetchArticleCategoryByUserId('userId_dfasfdsa')

    const editorable = ref<boolean>(false)

    const handleCreateArticleCategory = () => {
      console.log('创建专栏')
      editorable.value = true
    }
    const searchInputRef = ref('')

    const onInput = (newValue: string) => {
      searchInputRef.value = newValue
    }

    const handKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log('搜索专栏')
      }
    }

    const handleSave = (uid: string, title: string, description: string, coverUri: string) => {
      console.log(`${uid}\n${title}\n${description}\n${coverUri}`)
    }

    const renderCategoryEditDialog = () => {
      return (
        <>
          <ElDialog title="创建专栏" v-model={editorable.value} center destroyOnClose={true}>
            <ArticleCategoryEditor
              uid="uid"
              title="title"
              description="description"
              coverUri="coverUri"
              onSave={handleSave}
            />
          </ElDialog>
        </>
      )
    }

    const renderArticleOption = () => {
      return (
        <>
          {/* 选项列表：专栏 ， 操作：搜索、创建专栏 */}
          <div class="article-option">
            <div class="page-menu option-item">
              <ElMenu default-active="1" class="option-item" mode="horizontal">
                <ElMenuItem index="1">专栏</ElMenuItem>
              </ElMenu>
            </div>
            <ElInput
              placeholder="请输入专栏名称"
              v-model={searchInputRef.value}
              onInput={onInput}
              class="option-item search-input"
              clearable
              onKeydown={handKeyDown}
            />
            <ElButton type="primary" class="option-item" onClick={handleCreateArticleCategory}>
              创建专栏
            </ElButton>
          </div>
          {editorable.value && renderCategoryEditDialog()}
        </>
      )
    }

    const renderArticleCategory = () => {
      return (
        <>
          {currentArticleCategories.value.map(category => (
            <CategoryItem
              key={category.uid}
              uid={category.uid}
              name={category.name}
              summary={category.summary}
              coverUri={category.coverUri}
              articleCount={category.articleCount}
              visitCount={category.visitCount}
              createAt={category.createAt}
            />
          ))}
        </>
      )
    }

    return () => (
      <>
        <div class="page-container">
          {renderArticleOption()}
          {renderArticleCategory()}
        </div>
      </>
    )
  },
})
</script>
<style lang="scss" scoped>
:root {
  --background-color: transparent;
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90rem;
  min-height: 100%;
  padding: 2rem;
  margin: 0 auto;
  background-color: white;
}

.el-menu {
  background-color: transparent;
  border-bottom: none;
}

.el-menu-item {
  height: 100%;
  font-weight: bold;
  line-height: 3.6rem;
}

.el-menu-item:hover {
  background-color: transparent !important;
}

.el-menu-item.is-active {
  background-color: transparent !important;
}

.page-menu {
  flex: 1;
  height: 100%;
}

.article-option {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  width: 100%;
  height: 4.8rem;
  border-bottom: 1px solid #ccc;
}

.option-item {
  height: 3.6rem;
}

.search-input {
  width: 16rem;
}
</style>
