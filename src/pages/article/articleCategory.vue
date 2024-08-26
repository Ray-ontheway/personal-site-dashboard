<template>
  <div>
    <!-- Header -->
    <ArticleHeader
      :default-path="'home'"
      :menu-data="menuArr"
      btn-text="创建专栏"
      @menu-click="handleMenuClick"
      @search="handleSearch"
      @btn-click="handleBtnClick"
    />
    <!--  -->
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import ArticleHeader from './components/articleHeader.vue'
import { MenuData } from './components/articleHeader.vue'

const menuArr = [
  {
    id: '1',
    name: 'Item1',
    path: 'home',
  },
  {
    id: '2',
    name: '分类2',
    path: 'item1',
  },
  {
    id: '3',
    name: '分类3',
    path: 'item2',
  },
  {
    id: '4',
    name: '分类4',
    path: 'about',
  },
]

const handleMenuClick = (menuItem: MenuData) => {
  console.log('点击了分类', menuItem)
}

const handleSearch = (searchText: string) => {
  console.log('搜索', searchText)
}

const handleBtnClick = () => {
  console.log('创建专栏')
}
</script>

<style lang="scss" scoped>
.category-header {
  background-color: green !important;
  padding: 10px 0;
  border-bottom: 1px solid black;
  height: 60rem;
}
</style>
