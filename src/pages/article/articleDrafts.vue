<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useArticle } from '@/hooks/pages/article/useArticle'
import moment from 'moment'
import { ArticleResp } from '@/api/models/articleModel'
import { ArticleAPI } from '@/api/article'

const { articleDrafts, syncDrafts, deleteArticle, setCurEditArticle } = useArticle()

const router = useRouter()
const handleEdit = (article: ArticleResp | null) => {
  if (article && article.uid) {
    ArticleAPI.detail(article.uid).then(resp => {
      setCurEditArticle(resp)
      router.push({ name: 'ArticleEditor', query: { uid: article.uid } })
    })
    router.push({ name: 'ArticleEditor', query: { uid: article.uid } })
  } else {
    router.push({ name: 'ArticleEditor' })
  }
}
const handlePublish = () => {
  console.log('handlePublish')
}

syncDrafts()

const formatDatetime = (_row, _column, cellValue) => (cellValue ? moment(cellValue).format('yyyy-MM-DD') : '')
</script>

<template>
  <el-card class="flex-1 text-black">
    <template #header>
      <div class="flex items-center text-[1.6rem] text-[#333333] w-full bg-transparent">
        <span class="flex-1 h-full text-left">文章列表</span>
        <el-button type="primary" @click="handleEdit(null)" class="self-end">写文章</el-button>
      </div>
    </template>
    <el-table :data="articleDrafts">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author.email" label="作者" />
      <el-table-column prop="type.name" label="文章类型" />
      <el-table-column prop="updateAt" label="更新时间" :formatter="formatDatetime" />
      <el-table-column label="操作" fixed="right" width="200" align="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handlePublish">发布</el-button>
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
  </el-card>
</template>
