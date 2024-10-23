<template>
  <div class="exception_container">
    <el-card class="page-content">
      <template #header>
        <div class="header">
          <h1 class="header-title">当前页面不存在</h1>
        </div>
      </template>
      <div class="content">
        <p>页面不存在</p>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.exception_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
}

.page-content {
  width: 60%;
  height: 80%;
  background-color: white;
}
</style>
