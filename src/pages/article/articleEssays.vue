<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleEdit = () => {
  router.push({ name: 'ArticleEditor', query: { id: '1234566' } })
  console.log('handleEdit')
}
</script>

<template>
  <el-card class="page-content">
    <template #header>
      <div class="header"><span>文章列表</span> <el-button type="primary" @click="handleEdit">编辑</el-button></div>
    </template>
  </el-card>
</template>
<style lang="scss" scoped>
* {
  color: black;
}
.page-filter {
  ul {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    li {
      .filter-item {
        span {
          color: #333;
        }
      }
    }
  }
}

.header {
  display: flex;
  justify-content: flex-start;
  background-color: transparent;
  color: #333;

  span {
    font-size: 1.6rem;
  }
}

.page-content {
  flex: 1;
}
</style>
