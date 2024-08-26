import { ArticleTag, ArticleType } from '@api/models/articleModel'
import { ref } from 'vue'
import { ArticleTagApi } from '@/api/article'

export const useArticleType = () => {
  // const articleTypeList = ref<ArticleType[]>([])
  const articleTypeList = ref<ArticleType[]>()

  return {
    articleTypeList,
  }
}

export const useArticleTag = () => {
  const articleTagList = ref<ArticleTag[]>([])

  // 目前开始，先全部同步
  const fetchAllArticleTag = async () => {
    articleTagList.value = await ArticleTagApi.all()
  }

  return {
    articleTagList,
  }
}
