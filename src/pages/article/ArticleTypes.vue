<script setup lang="ts">
import { ArticleType } from '@/api/models/articleModel'
import { ref } from 'vue'
const curType = ref<ArticleType>({
  id: -1,
  uid: '',
  catKey: '',
  name: '',
  description: '',
})
</script>
<template>
  <div class="article-types-container">
    <el-card class="article-type-list-container"></el-card>
    <el-card class="article-type-editor-container">
      <el-form>
        <el-form :model="curType" label-position="top">
          <el-form-item label="类型名">
            <el-input v-model="curType.name" placeholder="类型名称" />
          </el-form-item>
          <el-form-item label="类型标识符">
            <el-input v-model="curType.name" placeholder="类型标识符" />
          </el-form-item>
          <el-form-item label="类型描述">
            <el-input v-model="curType.description" placeholder="输入描述" type="textarea" rows="5" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </el-form>
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
  width: 36rem;
}
</style>
