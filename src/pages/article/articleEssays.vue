<script lang="ts" setup>
import { useArticle } from '@/hooks/pages/article/useArticle'
import moment from 'moment'
import { ArticleResp } from '@/api/models/articleModel'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { ArticleAPI } from '@/api/article'
const route = useRoute()
const router = useRouter()

// TODO 这里有一个魔数
const pageIdx = computed(() => (route.query.pageIdx ? Number(route.query.pageIdx) : 1))
const pageSize = computed(() => (route.query.pageSize ? Number(route.query.pageSize) : 20))
const { articlePage, syncEssaysPage, deleteArticle, setCurEditArticle } = useArticle()

syncEssaysPage(pageIdx.value, pageSize.value)

watch(pageIdx, newPageIdx => {
  syncEssaysPage(newPageIdx, pageSize.value)
})
watch(pageSize, newPageSize => {
  syncEssaysPage(pageIdx.value, newPageSize)
})

const handlePageIdxChange = (newPageIdx: number) => {
  router.push({ query: { pageIdx: newPageIdx, pageSize: pageSize.value } })
}

const handlePageSizeChange = (newPageSize: number) => {
  router.push({ query: { pageIdx: pageIdx.value, pageSize: newPageSize } })
}

const handleEdit = (article: ArticleResp | null = null) => {
  if (article?.uid) {
    router.push({ name: 'ArticleEditor', query: { uid: article.uid } })
  } else {
    router.push({ name: 'ArticleEditor' })
  }
}

const formatDatetime = (_row, _column, cellValue) => (cellValue ? moment(cellValue).format('yyyy-MM-DD') : '')
</script>

<template>
  <el-card class="page-content">
    <template #header>
      <div class="header">
        <span class="header-title">文章列表</span>
        <el-button type="primary" @click="handleEdit" class="article-create">写文章</el-button>
      </div>
    </template>
    <el-table :data="articlePage.data">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author.email" label="作者" />
      <el-table-column prop="type.name" label="文章类型" />
      <el-table-column prop="updateAt" label="更新时间" :formatter="formatDatetime" />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm
            title="确认删除当前文章吗？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteArticle(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="article-page-pagination"
      v-model:current-page="articlePage.pageIdx"
      v-model:page-size="articlePage.pageSize"
      :page-sizes="[20, 30, 35, 40]"
      layout="sizes, prev, pager, next"
      :total="articlePage.total"
      @size-change="handlePageSizeChange"
      @current-change="handlePageIdxChange"
    />
  </el-card>
</template>
<style lang="scss" scoped>
* {
  color: black;
}

.page-filter {
  ul {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    li {
      .filter-item {
        span {
          color: #333;
        }
      }
    }
  }
}

.header {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  width: 100%;
  color: #333;
  background-color: transparent;
}

.header-title {
  flex: 1;
  text-align: left;
  height: 100%;
}
.article-create {
  align-self: flex-end;
}

.page-content {
  flex: 1;
}

.article-page-pagination {
  margin-top: 2rem;
}
</style>
