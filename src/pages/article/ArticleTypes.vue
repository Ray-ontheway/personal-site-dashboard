<script setup lang="ts">
import { ArticleType } from '@/api/models/articleModel'
import { useArticleType } from '@/hooks/pages/article/useArticleType'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const {
  currentArticleType,
  articleTypePage,
  syncPageArticleType,
  setCurrentArticleType,
  saveArticleType,
  deleteArticleType,
} = useArticleType()

syncPageArticleType()

const typeFormRef = ref<FormInstance>()
const rules = reactive<FormRules<ArticleType>>({
  name: [{ required: true, message: '请输入类型名', trigger: 'blur' }],
  catKey: [{ required: true, message: '请输入类型标识符', trigger: 'blur' }],
})
const doSaveType = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  console.log('doSaveType', formEl)

  await formEl.validate((valid, fields) => {
    if (!valid) {
      console.log('error submit!!', fields)
      return
    }
    saveArticleType()
  })
}
</script>
<template>
  <div class="article-types-container">
    <el-card class="article-type-list-container">
      <el-table :data="articleTypePage.data" width="100%">
        <el-table-column prop="name" label="名称" width="120" />
        <el-table-column prop="catKey" label="标识符" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="setCurrentArticleType(row)">编辑</el-button>
            <el-button link type="primary" @click="deleteArticleType(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="article-type-editor-container">
      <el-form ref="typeFormRef" :model="currentArticleType" :rules="rules" label-position="top" status-icon>
        <el-form-item label="类型名" required>
          <el-input v-model="currentArticleType.name" placeholder="类型名称" />
        </el-form-item>
        <el-form-item label="类型标识符" required>
          <el-input v-model="currentArticleType.catKey" placeholder="类型标识符" />
        </el-form-item>
        <el-form-item label="类型描述">
          <el-input v-model="currentArticleType.description" placeholder="输入描述" type="textarea" rows="5" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSaveType(typeFormRef)">
            {{ currentArticleType.id === undefined ? '新增' : '更新' }}
          </el-button>
        </el-form-item>
      </el-form>
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
