<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useArticle } from '@/hooks/pages/article/useArticle'
import moment from 'moment'

const { articlePage, syncArticlePage, deleteArticle } = useArticle()

const router = useRouter()
const handleEdit = () => {
  router.push({ name: 'ArticleEditor', query: { id: '1234566' } })
  console.log('handleEdit')
}

syncArticlePage()

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
      <el-table-column prop="createBy.username" label="作者" />
      <el-table-column prop="type.name" label="文章类型" />
      <el-table-column prop="publishAt" label="更新时间" :formatter="formatDatetime" />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit">编辑</el-button>
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
</style>
