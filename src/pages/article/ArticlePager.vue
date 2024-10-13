<template>
  <el-scrollbar class="article-page">
    <div>
      <PageTitle :page-title="pageTitle" />
      <PageTab :tab-data="currentPageTabs" :active-path="currentTab.name" @tab-change="onTabChange" />
      <router-view></router-view>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import PageTitle from '@pages/component/PageTitle.vue'
import PageTab from '@pages/component/PageTab.vue'
import type { TabItem } from '@hooks/components/usePage'
import { usePage } from '@/hooks/components/usePage'
import { useArticleType, useArticleTag } from '@/hooks/pages/article/useArticleType'
import { useArticle } from '@/hooks/pages/article/useArticle'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const { pageTitle, currentPageTabs, currentTab } = usePage()
const { syncArticlePage } = useArticle()
const { syncAllArticleTypes } = useArticleType()
const { syncAllArticleTags } = useArticleTag()

onMounted(() => {
  syncAllArticleTypes()
  syncAllArticleTags()
  syncArticlePage()
})

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
  width: 100%;
  height: 100%;
  padding: 2rem 2rem 0;

  /* stylelint-disable-next-line selector-class-pattern */
  .el-scrollbar__view {
    height: 100%;
  }
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
