import { PageObject } from '@/api/models/common'
import { Article, ArticleReq } from '@/api/models/articleModel'
import { ArticleAPI } from '@/api/article'
import { ref } from 'vue'

export const useArticle = () => {
  // 1. 文章分页程序
  const articlePage = ref<PageObject<Article>>({
    pageIdx: 1,
    pageSize: 10,
    total: 100,
    data: [],
  })

  const syncArticlePage = () => {
    ArticleAPI.page(articlePage.value.pageIdx, articlePage.value.pageSize)
      .then(page => {
        articlePage.value = page
        console.log(page)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const changePageIdx = (pageIdx: number) => {
    articlePage.value.pageIdx = pageIdx
    syncArticlePage()
  }
  const changePageSize = (pageSize: number) => {
    articlePage.value.pageSize = pageSize
    syncArticlePage()
  }

  // 2. 保存文章
  const saveArticle = async (article: ArticleReq) => {
    if (article.id === undefined) {
      await ArticleAPI.create(article)
      console.log('新增文章')
    } else {
      await ArticleAPI.update(article)
      console.log('更新文章')
    }
    syncArticlePage()
  }

  // 3. 删除文章
  const deleteArticle = async (article: Article) => {
    const result = await ArticleAPI.delete(article.uid)
    console.log(result)
    syncArticlePage()
  }

  return {
    articlePage,
    syncArticlePage,
    changePageIdx,
    changePageSize,
    saveArticle,
    deleteArticle,
  }
}
