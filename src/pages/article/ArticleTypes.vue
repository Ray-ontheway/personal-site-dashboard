<script setup lang="ts">
import { useArticleType } from '@/hooks/pages/article/useArticleType'
import { ref } from 'vue'
import ArticleTypeForm from './components/ArticleTypeForm.vue'
import { ArticleType } from '@/api/models/articleModel'

const { articleTypeList, syncAllArticleType, deleteArticleType } = useArticleType()

syncAllArticleType()

const editType = ref<ArticleType | undefined>(undefined)
const isEditable = ref(false)
const triggerEditable = (type: ArticleType | undefined = undefined) => {
  editType.value = type
  console.log('editType', editType.value)

  isEditable.value = true
}
const handleTypeSaveSuccess = () => {
  isEditable.value = false
  console.log('弹窗保存成功')
}
const handleTypeSaveError = () => {
  isEditable.value = false
  console.log('弹窗保存失败')
}
</script>
<template>
  <div class="article-types-container">
    <el-card class="article-type-list-container">
      <el-table :data="articleTypeList" width="100%">
        <el-table-column prop="name" label="类型名称" width="120" />
        <el-table-column prop="catKey" label="类型标识符" />
        <el-table-column prop="description" label="标签描述" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #header>
            <div style="margin: auto 0">
              <el-button type="primary" @click="triggerEditable(undefined)">新增</el-button>
            </div>
          </template>
          <template #default="{ row }">
            <el-button link type="primary" @click="triggerEditable(row)">编辑</el-button>
            <el-popconfirm
              title="确认删除该类型吗"
              @confirm="deleteArticleType(row)"
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
  </div>

  <el-dialog v-model="isEditable">
    <ArticleTypeForm :data="editType" @save-error="handleTypeSaveError" @save-success="handleTypeSaveSuccess" />
  </el-dialog>
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
