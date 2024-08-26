<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { ArticleEditModel, ArticleTag, ArticleType } from '@api/models/articleModel'
import ImageUpload from '@/components/upload/ImageUpload.vue'

const route = useRoute()

console.log(`route: ${route.query.id}`)

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault()
}

onMounted(() => {
  console.log('mounted')
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  console.log('unmounted')
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

const handleSave = (value: string) => {
  console.log(value)
}
const handleContentChange = (value: string) => {
  articleState.summary = value.slice(0, 50)
}
const handleImageUpload = (files: File[], callback: (urls: string[]) => {}) => {
  console.log(files)
  console.log(callback)
  callback(['https://example.com/image.png'])
}

const articleState = reactive<ArticleEditModel>({
  uid: '1',
  title: '',
  summary: '',
  content: '',
})

const types: ArticleType[] = [
  {
    id: 1,
    uid: '1',
    name: '前端',
    description: '前端技术',
  },
  {
    id: 2,
    uid: '2',
    name: '后端',
    description: '后端技术',
  },
  {
    id: 3,
    uid: '3',
    name: '数据库',
    description: '数据库技术',
  },
  {
    id: 4,
    uid: '4',
    name: '运维',
    description: '运维技术',
  },
  {
    id: 5,
    uid: '6',
    name: '云开发',
    description: '云开发技术',
  },
]
const tags: ArticleTag[] = [
  {
    id: 1,
    uid: '1',
    name: 'SpringBoot',
    description: 'Spring Boot 技术',
  },
  {
    id: 2,
    uid: '2',
    name: 'Vue',
    description: 'Vue 技术',
  },
  {
    id: 3,
    uid: '3',
    name: 'MySQL',
    description: 'MySQL 技术',
  },
  {
    id: 4,
    uid: '4',
    name: 'Nginx',
    description: 'Nginx 技术',
  },
  {
    id: 5,
    uid: '5',
    name: '云',
    description: '云 技术',
  },
]
const tagRef = ref<ArticleTag[]>([])
const typeRef = ref<ArticleType | null>()

const handleTypeChange = (value: any) => {
  typeRef.value = value
  console.log(typeRef.value)
  if (value) {
    articleState.typeId = value.id
  }
}
const handleTagsChange = (value: any) => {
  tagRef.value = value
  console.log(tagRef.value)
  if (value && value.length > 0) {
    articleState.tagIds = value.map((tag: ArticleTag) => tag.id)
  }
}

const handleUpload = (file: File, onLoading: () => void, onSuccess: (urls: string) => void, onError: () => {}) => {
  // 处理上传逻辑
  onLoading()
  resolveUpload(file)
    .then(url => {
      onSuccess(url)
    })
    .catch(() => {
      onError()
    })
}

const delay = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const resolveUpload = async (file: File) => {
  // 处理上传逻辑
  console.log('上传文件', file)
  await delay(3000)

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target && e.target.result) {
        resolve(e.target.result as string)
      } else {
        resolve(e.target?.result as string)
      }
    }
    reader.onerror = e => {
      reject(e)
    }
    reader.readAsDataURL(file)
  })
}

const handleCoverUploadSuccess = (url: string) => {
  articleState.cover = url
  console.log(url)
}
const handleConverUploadError = () => {
  console.log('上传失败')
}
const handleCoverUploading = () => {
  console.log('上传中')
}

const saveAsDraft = () => {
  console.log('保存为草稿')
  console.log(articleState)
}
const publish = () => {
  console.log('发布')
  console.log(articleState)
}
</script>

<template>
  <div class="editor-container">
    <el-card class="editor-content">
      <el-input v-model="articleState.title" placeholder="请输入文章标题"></el-input>
      <MdEditor
        v-model="articleState.content"
        class="left-align-text"
        @on-save="handleSave"
        @change="handleContentChange"
        @on-upload-img="handleImageUpload"
      />
    </el-card>
    <div class="editor-meta">
      <el-card>
        <template #header> <span>保存</span> </template>
        <div class="btn-option">
          <el-button type="info" plain @click="saveAsDraft">保存为草稿</el-button>
          <el-button type="primary" @click="publish">发布</el-button>
        </div>
      </el-card>
      <el-card class="editor-meta__item">
        <template #header>
          <span>分类</span>
        </template>
        <el-select v-model="typeRef" value-key="id" clearable @change="handleTypeChange">
          <el-option v-for="type in types" :key="type.id" :label="type.name" :value="type" />
        </el-select>
      </el-card>
      <el-card class="editor-meta__item">
        <template #header>
          <span>标签</span>
        </template>
        <el-select v-model="tagRef" value-key="id" clearable multiple @change="handleTagsChange">
          <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag" />
        </el-select>
      </el-card>
      <el-card class="editor-meta__item">
        <template #header>
          <span>封面图片</span>
        </template>
        <ImageUpload
          @before-upload="handleUpload"
          @on-success="handleCoverUploadSuccess"
          @on-error="handleConverUploadError"
          @on-loading="handleCoverUploading"
        />
      </el-card>
      <el-card class="editor-meta__item summary-wrap">
        <template #header>
          <span>摘要</span>
        </template>
        <el-input v-model="articleState.summary" class="input-summary" type="textarea" maxlength="50" show-word-limit />
      </el-card>
    </div>
  </div>
</template>

<style lang="scss">
.editor-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  padding: 10px 20px;
  background-color: #f7f8f9;
}

.editor-content {
  flex: 1;
  min-height: 80vh;

  &.el-card {
    display: flex;
    flex: 1;
  }
}

.el-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.md-editor {
  flex: 1;
  height: auto;
  text-align: left;
}

.editor-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 320px;

  & > * {
    text-align: left;

    &:first-child {
      margin-top: 0;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    max-width: 360px;

    &__title {
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      border-bottom: 1px solid #1a1b1c;
    }
  }
}

.input-summary {
  display: flex;
  flex: 1;
  min-height: 100px;
}

.btn-option {
  display: flex;
  gap: 10px;
}
</style>
