import { ArticleTag, ArticleType } from '@api/models/articleModel'
import { ref } from 'vue'
import { ArticleTagApi } from '@/api/article'

export const useArticleType = () => {
  // 文章类型列表
  const articleTypeList = ref<ArticleType[]>()

  // TODO 获取所有文章类型

  // TODO 当前编辑的文章类型

  // TODO 新增文章类型

  return {
    articleTypeList,
  }
}

export const useArticleTag = () => {
  const articleTagList = ref<ArticleTag[]>([])

  // TODO 获取所有文章tag

  // TODO 当前编辑的文章tag

  // TODO 新增文章tag

  // 目前开始，先全部同步
  const fetchAllArticleTag = async () => {
    articleTagList.value = await ArticleTagApi.all()
  }

  return {
    articleTagList,
  }
}
