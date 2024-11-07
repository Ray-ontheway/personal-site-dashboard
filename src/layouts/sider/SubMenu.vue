<template>
  <el-sub-menu v-if="data" :index="data.path">
    <template #title>
      <el-icon v-if="data.meta && data.meta.iconName">
        <Icon :icon="data.meta.iconName" class="text-[3.6rem]" />
      </el-icon>
      <span class="menu-text">{{ data.meta.title }}</span>
    </template>
    <template v-for="item in data.children" :key="item.path">
      <SubMenu v-if="item.children?.length > 0" :data="item" />
      <el-menu-item v-else :index="item.path">
        {{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { AppRouteRecordRaw } from 'src/router/types'
import { toRefs } from 'vue'
import { Icon } from '@iconify/vue'

interface SubMenuProps {
  data: AppRouteRecordRaw | undefined
}

const props: SubMenuProps = defineProps<SubMenuProps>()
const { data } = toRefs(props)
</script>
