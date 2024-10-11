<script setup lang="ts">
import type { TabItem } from '@hooks/components/usePage'
import { toRefs } from 'vue'

interface TabProps {
  tabData: Array<TabItem>
  activePath: string
}

const props = withDefaults(defineProps<TabProps>(), {
  tabData: () => [] as TabItem[],
  activePath: '',
})

const emits = defineEmits(['tab-change'])

const { tabData, activePath } = toRefs(props)

const handleClick = (tabName: string) => {
  const curTabItem = tabData.value.find(item => item.name === tabName)
  if (curTabItem) {
    emits('tab-change', curTabItem)
  }
}
console.log(`tabData`, tabData.value)
console.log(`activePath`, activePath.value)
</script>

<template>
  <el-tabs v-model="activePath" @tab-change="handleClick">
    <el-tab-pane v-for="item in tabData" :key="item.path" :label="item.title" :name="item.name" class="tab-item" />
  </el-tabs>
</template>

<style lang="scss" scoped>
// .tab-item {
// }
</style>
