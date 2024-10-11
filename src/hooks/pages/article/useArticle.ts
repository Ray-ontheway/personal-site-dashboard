import { PageObject } from '@/api/models/common'
import { Article } from '@/api/models/articleModel'
import { ArticleAPI } from '@/api/article'
import { ref } from 'vue'

export const useArticle = () => {
  // 1. 文章分页程序
  const articlePage = ref<PageObject<Article>>({
    pageIdx: 1,
    pageSize: 10,
    total: 0,
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
  const saveArticle = async (article: Article) => {
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
  const deleteArticle = async (uid: string) => {
    await ArticleAPI.delete(uid)
    syncArticlePage()
  }

  return {
    articlePage,
    syncArticlePage,
    changePageIdx,
    changePageSize,
    saveArticle,
  }
}
