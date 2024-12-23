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
  drafts: ArticleResp[]
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
    drafts: [],
    curEditArticle: null,
  }),
  getters: {
    getCurArticlePage(state: ArticleState): PageObject<ArticleResp> {
      return state.curArticlePage
    },
    getCurEditArticle(state: ArticleState): ArticleResp | null {
      return state.curEditArticle
    },
    getDrafts(state: ArticleState): ArticleResp[] {
      return state.drafts
    },
  },
  actions: {
    setCurEditArticle(article: ArticleResp | null) {
      this.curEditArticle = article
    },
    resetCurEditArticle() {
      this.curEditArticle = null
    },
    async fetchCurArticlePage(pageIdx: number = 1, pageSize: number = 10) {
      const res = await ArticleAPI.page(pageIdx, pageSize)
      this.curArticlePage = { ...res, data: res.records }
    },
    async syncDrafts() {
      const res = await ArticleAPI.drafts()
      this.drafts = res
    },
    async essaysPage(pageIdx: number = 1, pageSize: number = 10) {
      if (
        pageIdx === this.pageInfo.pageIdx &&
        pageSize === this.pageInfo.pageSize &&
        this.curArticlePage.data.length > 0
      ) {
        return
      }
      this.pageInfo.pageIdx = pageIdx
      this.pageInfo.pageSize = pageSize
      const res = await ArticleAPI.essaysPage(pageIdx, pageSize)
      this.curArticlePage = { ...res, data: res.records }
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
      if (articleReq.id) {
        await ArticleAPI.update(articleReq as ArticleUpdateReq)
      } else {
        await ArticleAPI.create(articleReq as ArticleCreateReq)
      }
      await this.fetchCurArticlePage()
    },
    async deleteArticle(article: ArticleResp) {
      await ArticleAPI.delete(article.id)
      await this.fetchCurArticlePage()
    },
  },
})
