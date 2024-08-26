<template>
  <div class="article-page">
    <!-- <div class="page-title"><span>文章管理</span></div> -->
    <PageTitle :page-title="pageTitle" />
    <PageTab :tab-data="currentPageTabs" :active-path="currentTab.name" @tab-change="onTabChange" />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@pages/component/PageTitle.vue'
import PageTab from '@pages/component/PageTab.vue'
import type { TabItem } from '@hooks/components/usePage'
import { usePage } from '@/hooks/components/usePage'
import { useRouter } from 'vue-router'

const { pageTitle, currentPageTabs, currentTab } = usePage()

const router = useRouter()

const onTabChange = (tabItem: TabItem) => {
  router.push({ name: tabItem.name })
}
</script>

<style lang="scss" scoped>
.article-page {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.page-title {
  display: flex;
  flex-direction: row;
  justify-self: start;
  padding: 3rem 0;
  font-size: 2.4rem;
  color: #1a1b1c;
}

.pane-title {
  font-size: 3rem;
  color: #1a1b1c;
}

.tab-item {
  font-size: 1.8rem;
}
</style>
