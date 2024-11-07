<template>
  <el-aside width="28rem" class="flex flex-col">
    <div class="flex-1 m-8 card bg-[#fff] shadow-base">
      <AppLogo />
      <AsideMenu />
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { AppLogo } from '@/components/application'
import AsideMenu from './AsideMenu.vue'
</script>
