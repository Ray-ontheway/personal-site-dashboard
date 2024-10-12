<script setup lang="ts">
import { useArticleTag } from '@/hooks/pages/article/useArticleType'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const {
  currentArticleTag,
  articleTagList,
  syncAllArticleTags,
  setCurrentArticleTag,
  saveArticleTag,
  deleteArticleTag,
} = useArticleTag()

syncAllArticleTags()

const isValidated = ref(false)
const validateTypeCatKey = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入类型标识符'))
  } else if (value !== currentArticleTag.value.catKey) {
    callback(new Error('类型标识符不可修改'))
  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
    callback(new Error('类型标识符只能包含字母和数字'))
  } else {
    callback()
  }
}
const typeFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof currentArticleTag>>({
  name: [
    { required: true, message: '请输入类型名', trigger: 'change' },
    { min: 1, max: 50, message: 'Length should be 3 to 5', trigger: 'change' },
  ],
  catKey: [
    { required: true, message: '请输入类型标识符', trigger: 'change' },
    { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'change' },
    { validator: validateTypeCatKey, trigger: 'change' },
  ],
})
const isNameValidated = ref(false)
const isCatKeyValidated = ref(false)
const onValidate = (prop, isValid) => {
  if (prop === 'name') {
    isNameValidated.value = isValid
  } else if (prop === 'catKey') {
    isCatKeyValidated.value = isValid
  }
  isValidated.value = isNameValidated.value && isCatKeyValidated.value
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
          <template #default="{ row }">
            <el-button link type="primary" @click="setCurrentArticleTag(row)">编辑</el-button>
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
    <el-card class="article-type-editor-container">
      <el-form
        ref="typeFormRef"
        :model="currentArticleTag"
        @validate="onValidate"
        :rules="rules"
        label-position="top"
        status-icon
      >
        <el-form-item label="标签名" prop="name" required>
          <el-input v-model="currentArticleTag.name" placeholder="类型名称" />
        </el-form-item>
        <el-form-item label="标签标识符" prop="catKey" required>
          <el-input v-model="currentArticleTag.catKey" placeholder="类型标识符" />
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input v-model="currentArticleTag.description" placeholder="输入描述" type="textarea" rows="5" />
        </el-form-item>
        <el-form-item>
          <el-popconfirm
            title="确认保存吗?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="saveArticleTag"
          >
            <template #reference>
              <el-button type="primary" :disabled="!isValidated">
                {{ currentArticleTag.id === undefined ? '新增' : '更新' }}
              </el-button>
            </template>
          </el-popconfirm>
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
