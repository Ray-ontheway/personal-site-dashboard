<!-- 单个图片上传 -->
<template>
  <div v-if="isUploadReady" class="upload-container" @click="handleSelectFile">
    <el-icon size="20px">
      <SvgIcon name="vue" color="#272829" />
    </el-icon>
    <span class="upload-tip">点击选择图片上传</span>
    <input ref="uploadInput" type="file" style="display: none" @change="handleFileChange" />
  </div>
  <div v-if="isUploadLoading" class="upload-container">
    <Loading :visible="true" />
  </div>
  <div v-if="isUploadSuccess" class="upload-container"><img :src="imgUrl" alt="" /></div>
  <div v-if="isUploadError" class="upload-container"><img :src="imgUrl" alt="" /></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Loading from '@/components/loading/Loading.vue'
import { SvgIcon } from '@/components/Icon'
enum UploadStatus {
  Ready,
  Uploading,
  Success,
  Error,
}

const emit = defineEmits(['before-upload', 'on-loading', 'on-success', 'on-error'])

const currentFile = ref<File | null>(null)
const imgUrl = ref<string>('')

const uploadStatus = ref<UploadStatus>(UploadStatus.Ready)
const isUploadReady = computed(() => uploadStatus.value === UploadStatus.Ready)
const isUploadLoading = computed(() => uploadStatus.value === UploadStatus.Uploading)
const isUploadSuccess = computed(() => uploadStatus.value === UploadStatus.Success)
const isUploadError = computed(() => uploadStatus.value === UploadStatus.Error)

// 隐藏input, 通过js出发input的click事件
const uploadInput = ref<HTMLInputElement | null>(null)
const handleSelectFile = () => {
  uploadInput.value?.click()
}

// 在input的change事件中获取文件，并通知父组件
const handleFileChange = (event: Event) => {
  console.log(event)
  const files = (event.target as HTMLInputElement).files
  if (!files || files.length === 0) {
    return
  }
  // 读取最后一个文件
  currentFile.value = files[files.length - 1]
  // 通知父组件进行文件上传，并在文件上传成功后通过回调函数更新状态
  emit('before-upload', currentFile.value, onLoading, onSuccess, onError)
}

// 更新状态的几个回调函数
const onLoading = () => {
  uploadStatus.value = UploadStatus.Uploading
  console.log('上传中')
  emit('on-loading', onLoading)
}
const onSuccess = (url: string) => {
  console.log('上传成功')
  imgUrl.value = url
  uploadStatus.value = UploadStatus.Success
  emit('on-success', url)
}
const onError = () => {
  uploadStatus.value = UploadStatus.Error
  console.log('上传失败')
  emit('on-error')
}
</script>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  cursor: pointer;
  border: 1px dashed #a7a8a9;
  border-radius: 4px;

  img {
    flex: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.upload-tip {
  font-size: 16px;
  color: #979899;
}
</style>
