<template>
  <el-container class="home-container">
    <RSider />
    <el-container class="main-container">
      <el-header class="header-container">
        <RHeader />
      </el-header>
      <el-main class="scrollable-main">
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
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: row;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .header-container {
      color: #fff;
      text-align: center;
      background-color: #409eff;
    }

    .scrollable-main {
      flex: 1;
      overflow: auto;
      display: flex;
      // align-items: center;
      justify-content: center;

      .el-main {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

// .main-container
</style>
