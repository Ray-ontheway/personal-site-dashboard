<template>
  <div class="article-type-editor-container">
    <el-form
      ref="typeFormRef"
      :model="currentArticleType"
      @validate="onValidate"
      :rules="rules"
      label-position="top"
      status-icon
    >
      <el-form-item label="类型名" prop="name" required>
        <el-input v-model="currentArticleType.name" placeholder="类型名称" />
      </el-form-item>
      <el-form-item label="类型标识符" prop="catKey" required>
        <el-input v-model="currentArticleType.catKey" placeholder="类型标识符" />
      </el-form-item>
      <el-form-item label="类型描述" prop="description">
        <el-input v-model="currentArticleType.description" placeholder="输入描述" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          title="确认保存吗?"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="handleSaveType"
        >
          <template #reference>
            <el-button type="primary" :disabled="!isValidated">
              {{ currentArticleType.id === undefined ? '新增' : '更新' }}
            </el-button>
          </template>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue'
import { useArticleTypeForm } from '@/hooks/pages/article/useArticleType'
import { FormInstance, FormRules } from 'element-plus'
import { ArticleType } from '@/api/models/articleModel'

interface FormProps {
  data?: ArticleType
}

const emits = defineEmits(['saveSuccess', 'saveError'])

const props = defineProps<FormProps>()
const { data } = toRefs(props)

console.log('props.data', data)
watch(data, newVal => {
  console.log('newVal', newVal)
})

const { currentArticleType, saveArticleType } = useArticleTypeForm(data)

const isValidated = ref(false)
const validateTypeCatKey = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入类型标识符'))
  } else if (value !== currentArticleType.value.catKey) {
    callback(new Error('类型标识符不可修改'))
  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
    callback(new Error('类型标识符只能包含字母和数字'))
  } else {
    callback()
  }
}
const typeFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof currentArticleType>>({
  name: [
    { required: true, message: '请输入类型名', trigger: 'change' },
    { min: 1, max: 50, message: 'Length should be 3 to 50', trigger: 'change' },
  ],
  catKey: [
    { required: true, message: '请输入类型标识符', trigger: 'change' },
    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'change' },
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

const handleSaveType = () => {
  saveArticleType().then(result => {
    if (result) {
      emits('saveSuccess')
    } else {
      emits('saveError')
    }
  })
}
</script>

<style lang="scss" scoped>
.article-type-editor-container {
  // width: 20rem;
  margin: 0 auto;
}
</style>
