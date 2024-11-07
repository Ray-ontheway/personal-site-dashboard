<template>
  <div class="w-full flex flex-row items-center gap-8 p-8 h-[6rem]">
    <img :src="logo" alt="logo" class="w-12 h-12" />
    <h1 class="text-[2.8rem] text-[#1a1b1c] font-logo">{{ text }}</h1>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import logo from '@/assets/imgs/rayc.png'

interface AppLogoProps {
  text?: string
}

const props = withDefaults(defineProps<AppLogoProps>(), {
  text: 'R-Admin',
})

const { text } = toRefs(props)
</script>
