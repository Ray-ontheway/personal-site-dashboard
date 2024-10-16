import { ArticleAPI } from '@/api/article'
import { ArticleCreateReq, ArticleResp, ArticleUpdateReq } from '@/api/models/articleModel'
import { PageObject } from '@/api/models/common'
import { defineStore } from 'pinia'

interface PageInfo {
  pageIdx: number
  pageSize: number
}

interface ArticleState {
  pageInfo: PageInfo
  curArticlePage: PageObject<ArticleResp>
  curEditArticle: ArticleResp | null
}

export const useArticleStore = defineStore({
  id: 'article',
  state: (): ArticleState => ({
    pageInfo: {
      pageIdx: 1,
      pageSize: 10,
    },
    curArticlePage: {
      pageIdx: 1,
      pageSize: 10,
      total: 0,
      data: [],
    },
    curEditArticle: null,
  }),
  getters: {
    getCurArticlePage(state: ArticleState): PageObject<ArticleResp> {
      return state.curArticlePage
    },
    getCurEditArticle(state: ArticleState): ArticleResp | null {
      return state.curEditArticle
    },
  },
  actions: {
    setCurEditArticle(article: ArticleResp | null) {
      this.curEditArticle = article
    },
    resetCurEditArticle() {
      this.curEditArticle = null
    },
    async fetchCurArticlePage() {
      const { pageIdx, pageSize } = this.pageInfo
      const res = await ArticleAPI.page(pageIdx, pageSize)
      this.curArticlePage = { ...res, data: res.records }
      console.log('fetchCurArticlePage', this.curArticlePage)
    },
    async changePageIdx(pageIdx: number) {
      this.pageInfo.pageIdx = pageIdx
      await this.fetchCurArticlePage()
    },
    async changePageSize(pageSize: number) {
      this.pageInfo.pageSize = pageSize
      await this.fetchCurArticlePage()
    },
    async saveArticle(articleReq: ArticleUpdateReq) {
      console.log('saveArticle', articleReq)
      if (articleReq.id) {
        await ArticleAPI.update(articleReq as ArticleUpdateReq)
      } else {
        await ArticleAPI.create(articleReq as ArticleCreateReq)
      }
      await this.fetchCurArticlePage()
    },
    async deleteArticle(article: ArticleResp) {
      await ArticleAPI.delete(article.id)
      console.log('delete article', article)
      await this.fetchCurArticlePage()
    },
  },
})
