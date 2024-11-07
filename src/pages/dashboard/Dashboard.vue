<template>
  <div class="flex flex-wrap gap-12">
    <div
      class="card w-96 h-64 shadow-md hover:shadow-lg bg-base-100 text-black flex flex-col items-start justify-around p-12"
    >
      <span class="text-gray-600 text-[2rem]">文章数量</span>
      <div class="flex flex-row items-center gap-[2rem]">
        <Icon icon="bx:bxs-book" class="text-4xl text-cyan-800 text-[3.2rem]" />
        <span class="text-[3.2rem]">{{ dashboardData.essaysCount }} / {{ dashboardData.articleCount }}</span>
      </div>
    </div>

    <div
      class="card w-96 h-64 shadow-md hover:shadow-lg bg-base-100 text-black flex flex-col items-start justify-around p-12"
    >
      <span class="text-gray-600 text-[2rem]">阅读数量</span>
      <div class="flex flex-row items-center gap-[2rem]">
        <Icon icon="material-symbols:chrome-reader-mode-rounded" class="text-4xl text-cyan-800 text-[3.2rem]" />
        <span class="text-[3.2rem]">{{ dashboardData.pv }}</span>
      </div>
    </div>

    <div
      class="card w-96 h-64 shadow-md hover:shadow-lg bg-base-100 text-black flex flex-col items-start justify-around p-12"
    >
      <span class="text-gray-600 text-[2rem]">访问数量</span>
      <div class="flex flex-row items-center gap-[2rem]">
        <Icon icon="mdi:address-marker" class="text-4xl text-cyan-800 text-[3.2rem]" />
        <span class="text-[3.2rem]">{{ dashboardData.uv }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { DashboardAPI } from '@/api/dashboard'
import { DashboardData } from '@/api/models/dashboardModel'

const dashboardData = ref<DashboardData>({
  articleCount: 0,
  essaysCount: 0,
  pv: 0,
  uv: 0,
})

DashboardAPI.getDashboardData().then(res => {
  dashboardData.value = res
  console.log(res)
})
</script>

<style scoped></style>
