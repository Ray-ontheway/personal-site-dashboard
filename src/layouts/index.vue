<template>
  <el-container class="container">
    <RSider />
    <el-container>
      <el-header class="header">
        <RHeader />
      </el-header>
      <el-main>
        <router-view />
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
</style>
