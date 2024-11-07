<template>
  <el-sub-menu v-if="data" :index="data.path">
    <template #title>
      <el-icon v-if="data.meta && data.meta.iconName">
        <SvgIcon :name="data.meta.iconName" />
      </el-icon>
      <span class="menu-text">{{ data.meta.title }}</span>
    </template>
    <template v-for="item in data.children" :key="item.path">
      <SubMenu v-if="item.key" :data="item" />
      <el-menu-item v-else :index="item.path">
        {{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { SvgIcon } from '@/components/Icon'
import { AppRouteRecordRaw } from 'src/router/types'
import { toRefs } from 'vue'

interface SubMenuProps {
  data: AppRouteRecordRaw | undefined
}

const props: SubMenuProps = defineProps<SubMenuProps>()
const { data } = toRefs(props)
</script>
