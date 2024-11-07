<template>
  <el-container class="min-h-screen min-w-screen bg-[#f6f7f8]">
    <Aside />
    <el-main class="main-content">
      <router-view />
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import Aside from './sider/Aside.vue'
</script>
