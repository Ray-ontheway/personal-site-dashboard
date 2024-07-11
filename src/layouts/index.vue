<template>
  <el-container class="container">
    <RSider />
    <el-container class="main-container">
      <el-header class="header">
        <RHeader />
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import RHeader from './header'
import RSider from './sider'
</script>

<style lang="scss">
.header {
  color: #fff;
  text-align: center;
  background-color: #409eff;
}

.container {
  min-height: 100vh;
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
</style>
