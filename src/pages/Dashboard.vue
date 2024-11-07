<template>
  <div
    class="card w-96 h-64 shadow-md hover:shadow-lg bg-dark-50 text-black flex flex-col items-start justify-around p-12"
  >
    <span class="text-gray-600 text-[2rem]">文章数量</span>
    <div class="flex flex-row items-center gap-[2rem]">
      <Icon icon="bx:bxs-book" class="text-4xl text-cyan-800 text-[3.2rem]" />
      <span class="text-[3.2rem]">2</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped></style>
