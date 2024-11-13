<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ArticleTag, ArticleType } from '@api/models/articleModel'
import ImageUpload from '@/components/upload/ImageUpload.vue'
import { useArticleEditor } from '@/hooks/pages/article/useArticle'
import { useArticleType, useArticleTag } from '@/hooks/pages/article/useArticleType'
import { FileApi } from '@/api/file'
import { ElNotification } from 'element-plus'
import ArticleTypeForm from './components/ArticleTypeForm.vue'
import ArticleTagForm from './components/ArticleTagForm.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleUid = route.query.uid as string

const { articleTypeList, addType } = useArticleType()
const { articleTagList, addTag } = useArticleTag()
const types = articleTypeList.value
const tags = articleTagList.value

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault()
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

const handleSave = (_value: string) => {
  if (isDraft.value) {
    saveAsDraft()
  } else {
    saveAsEssay()
  }
}
const onContentChange = (value: string) => {
  editorArticle.value.summary = value.slice(0, 50)
}
const handleImageUpload = (files: File[], callback: (urls: string[]) => void) => {
  if (files.length === 0) {
    return
  }
  FileApi.upload(files[0])
    .then(url => {
      callback([url])
    })
    .catch(() => {
      callback([])
    })
}

const { curTypes, curTags, editorType, editorTags, editorArticle, isDraft, saveAsDraft, saveAsEssay } =
  useArticleEditor(types, tags, articleUid)

const handleTypeChange = (value: any) => {
  editorType.value = value
  if (value) {
    editorArticle.value.typeId = value.id
  }
}
const handleTagsChange = (value: any) => {
  editorTags.value = value
  if (value) {
    editorArticle.value.tagIds = value.map((tag: ArticleTag) => tag.id)
  }
}

const handleUpload = (file: File, onLoading: () => void, onSuccess: (urls: string) => void, onError: () => void) => {
  // 处理上传逻辑
  onLoading()
  FileApi.upload(file)
    .then(url => {
      onSuccess(url)
    })
    .catch(() => {
      onError()
    })
}

const onCoverUploadSuccess = (url: string) => {
  editorArticle.value.cover = url
  ElNotification.success({
    title: '上传成功',
    message: '封面图片上传成功',
  })
}
const onCoverUploadError = () => {
  ElNotification.error({
    title: '上传失败',
    message: '上传封面图片失败',
  })
}
const handleCoverUploading = () => {
  ElNotification({
    title: '上传中',
    message: '封面图片上传中',
  })
}

// dialog
const typeDialogVisible = ref(false)
const tagDialogVisible = ref(false)
const editType = ref<ArticleType | undefined>(undefined)
const editTag = ref<ArticleTag | undefined>(undefined)
const triggerTypeDialog = () => {
  editType.value = undefined
  typeDialogVisible.value = true
}
const triggerTagDialog = () => {
  editTag.value = undefined
  tagDialogVisible.value = true
}
const onTypeSaveSuccess = (type: ArticleType) => {
  typeDialogVisible.value = false
  addType(type)
}
const onTagSaveSuccess = (tag: ArticleTag) => {
  tagDialogVisible.value = false
  addTag(tag)
}
const onTypeSaveError = () => {
  typeDialogVisible.value = false
}
const onTagSaveError = () => {
  tagDialogVisible.value = false
}
const onTypeCancel = () => {
  typeDialogVisible.value = false
}
const onTagCancel = () => {
  tagDialogVisible.value = false
}
</script>

<template>
  <div class="editor-container">
    <el-card class="editor-content">
      <el-input v-model="editorArticle.title" placeholder="请输入文章标题"></el-input>
      <MdEditor
        v-model="editorArticle.content"
        @on-save="handleSave"
        @change="onContentChange"
        @on-upload-img="handleImageUpload"
      />
    </el-card>
    <div class="editor-meta">
      <el-card>
        <template #header> <span>保存</span> </template>
        <div class="btn-option">
          <el-button v-if="isDraft" type="info" plain @click="saveAsDraft">保存为草稿</el-button>
          <el-button type="primary" @click="saveAsEssay">{{ isDraft ? '发布' : '更新' }}</el-button>
        </div>
      </el-card>
      <el-card class="editor-meta__item">
        <template #header>
          <div class="tag-header">
            <span>分类</span>
            <el-button link type="primary" @click="triggerTypeDialog">新增</el-button>
          </div>
        </template>
        <el-select v-model="editorType" value-key="id" clearable @change="handleTypeChange">
          <el-option v-for="type in curTypes" :key="type.id" :label="type.name" :value="type" />
        </el-select>
      </el-card>
      <el-card class="editor-meta__item">
        <template #header>
          <div class="tag-header">
            <span>标签</span>
            <el-button link type="primary" @click="triggerTagDialog">新增</el-button>
          </div>
        </template>
        <el-select v-model="editorTags" value-key="id" clearable multiple @change="handleTagsChange">
          <el-option v-for="tag in curTags" :key="tag.id" :label="tag.name" :value="tag" />
        </el-select>
      </el-card>
      <el-card class="editor-meta__item">
        <template #header>
          <span>封面图片</span>
        </template>
        <!-- TODO 暂时先这样用，后面图片系统完成之后，添加图片素材选取的功能 -->
        <el-input v-model="editorArticle.cover" />
        <ImageUpload
          :imgUrl="editorArticle.cover"
          @before-upload="handleUpload"
          @on-success="onCoverUploadSuccess"
          @on-error="onCoverUploadError"
          @on-loading="handleCoverUploading"
        />
      </el-card>
      <el-card class="editor-meta__item summary-wrap">
        <template #header>
          <span>摘要</span>
        </template>
        <el-input
          v-model="editorArticle.summary"
          class="input-summary"
          type="textarea"
          maxlength="50"
          show-word-limit
        />
      </el-card>
    </div>
  </div>
  <el-dialog v-model="typeDialogVisible">
    <ArticleTypeForm
      :type="editType"
      @cancel="onTypeCancel"
      @save-success="onTypeSaveSuccess"
      @save-error="onTypeSaveError"
    />
  </el-dialog>
  <el-dialog v-model="tagDialogVisible">
    <ArticleTagForm
      :tag="editTag"
      @cancel="onTagCancel"
      @save-success="onTagSaveSuccess"
      @save-error="onTagSaveError"
    />
  </el-dialog>
</template>

<style lang="scss">
* {
  font-size: 16px;
}

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
  width: 100%;

  & > .el-card__body {
    display: flex;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.el-card-body {
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

.tag-header {
  display: flex;
  justify-content: space-between;

  span {
    flex: 1;
  }
}
</style>
