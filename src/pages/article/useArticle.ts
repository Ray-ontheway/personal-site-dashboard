import { ArticleAPI } from '@/api/article'
import { ArticleCategoryResp } from '@api/models/articleModel'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'

const useArticleManager = () => {
  const currentArticleCategories = ref<ArticleCategoryResp[]>([])

  const fetchArticleCategoryByUserId = (userId: string) => {
    ArticleAPI.allByUser(userId)
      .then((articleCategories: ArticleCategoryResp[]) => {
        currentArticleCategories.value = articleCategories
      })
      .catch(() => {
        ElNotification.error({ title: 'Error', message: 'Failed to fetch article categories' })
      })
  }
  return {
    currentArticleCategories,
    fetchArticleCategoryByUserId,
  }
}

export { useArticleManager }
