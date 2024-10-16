<script setup lang="ts">
import { useArticleTag } from '@/hooks/pages/article/useArticleType'
import { ref, onMounted } from 'vue'
import ArticleTagForm from './components/ArticleTagForm.vue'
import { ArticleTag } from '@/api/models/articleModel'
import { ElNotification } from 'element-plus'

const { articleTagList, syncAllArticleTags, deleteArticleTag, addTag } = useArticleTag()

onMounted(() => {
  syncAllArticleTags()
})

const editTag = ref<ArticleTag | undefined>(undefined)
const isEditable = ref(false)
const triggerEdit = (tag: ArticleTag | undefined) => {
  editTag.value = tag
  isEditable.value = true
}
const onTagSaveSuccess = (tag: ArticleTag) => {
  isEditable.value = false
  syncAllArticleTags()
}
const onTagSaveError = () => {
  isEditable.value = false
  ElNotification.error({
    title: '失败',
    message: '保存文章标签失败',
  })
}
const onCancel = () => {
  isEditable.value = false
}
</script>
<template>
  <div class="article-types-container">
    <el-card class="article-type-list-container">
      <el-table :data="articleTagList" width="100%">
        <el-table-column prop="name" label="标签名称" width="120" />
        <el-table-column prop="catKey" label="标签标识符" />
        <el-table-column prop="description" label="标签描述" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #header>
            <el-button type="primary" @click="triggerEdit(undefined)">新增</el-button>
          </template>
          <template #default="{ row }">
            <el-button link type="primary" @click="triggerEdit(row)">编辑</el-button>
            <el-popconfirm
              title="确认删除该类型吗"
              @confirm="deleteArticleTag(row)"
              confirm-button-text="确认"
              cancel-button-text="放弃"
            >
              <template #reference>
                <el-button type="danger" link>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-show="isEditable" class="article-type-editor-container">
      <ArticleTagForm
        :data="editTag"
        @save-error="onTagSaveError"
        @save-success="onTagSaveSuccess"
        @cancel="onCancel"
      />
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
* {
  color: black;
}

.article-types-container {
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 5rem;
  width: 100%;
  height: 100%;
  padding: 1rem 0 0;
}

.article-type-list-container {
  flex: 1;
}

.article-type-editor-container {
  width: 32rem;
  height: max-content;
}
</style>
