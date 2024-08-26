import { ArticleAPI } from '@/api/article'
import { ArticleCategoryResp } from '@api/models/articleModel'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'

const useArticleManager = () => {
  const currentAricleCategories = ref<ArticleCategoryResp[]>([])

  const fetchArticleCategoryByUserId = (userId: string) => {
    ArticleAPI.allByUser(userId)
      .then((articleCategories: ArticleCategoryResp[]) => {
        currentAricleCategories.value = articleCategories
      })
      .catch(_error => {
        ElNotification.error({ title: 'Error', message: 'Failed to fetch article categories' })
      })
  }
  return {
    currentAricleCategories,
    fetchArticleCategoryByUserId,
  }
}

export { useArticleManager }
