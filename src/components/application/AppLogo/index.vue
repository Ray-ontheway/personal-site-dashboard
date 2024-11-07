<template>
  <div class="w-full flex flex-row items-center gap-8 p-8 h-[6rem]">
    <SvgIcon name="rayc" color="#fff" class="w-[3.6rem] h-[3.6rem]" />
    <h1 class="text-[2.8rem] text-[#1a1b1c] font-logo">{{ text }}</h1>
  </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@/components/Icon'
import { Icon } from '@iconify/vue'
import { toRefs } from 'vue'

interface AppLogoProps {
  text?: string
  collapse?: boolean
}

const props = withDefaults(defineProps<AppLogoProps>(), {
  text: 'R-Admin',
  collapse: false,
})

const { text, collapse } = toRefs(props)
</script>
