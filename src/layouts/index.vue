<template>
  <el-container class="container">
    <RSider />
    <el-main class="main-content">
      <el-scrollbar>
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import RSider from './sider'
</script>

<style lang="scss">
@import url('@styles/variables');

.header {
  color: #fff;
  text-align: center;
  background-color: #409eff;
}

.container {
  height: 100vh;
  background-color: $primary-background-color;
}

.main-container .el-main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-container .el-scrollbar {
  width: 100%;
  height: 100%;
}

.main-container .el-scrollbar__view {
  width: 100%;
  height: 100%;
}

.main-content {
  flex: 1;
  overflow: auto;
}
</style>
