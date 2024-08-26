<script setup lang="ts">
// import BaseLayout from './layouts'
import { useAppStore } from './store/modules/app'
const appStore = useAppStore()
appStore.buildRoutes()
</script>

<template>
  <router-view />
</template>
