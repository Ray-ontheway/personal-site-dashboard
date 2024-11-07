<template>
  <el-menu :default-active="getCurrentPath" router :collapse="collapsed">
    <template v-for="route in getMenus" :key="route.path">
      <SubMenu v-if="route.children" :data="route" />
      <el-menu-item v-else>
        {{ route.meta.title }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import SubMenu from './SubMenu.vue'
import { useMenu } from '@/hooks/useMenu'
import { ref } from 'vue'

const { getMenus, getCurrentPath } = useMenu()
const collapsed = ref(false)
</script>

<style scoped lang="scss">
:root {
  --el-menu-bg-color: #f6f7f8;
  --el-menu-text-color: #1a1b1c;
  --el-menu-active-colot: #4a90e2;
  --el-menu-hover-bg-color: #eeeff0;
}

.el-menu {
  border: none;
}
</style>
