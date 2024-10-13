import { ArticleTagApi, ArticleTypeApi } from '@/api/article'
import { ArticleTag, ArticleType } from '@/api/models/articleModel'
import { defineStore } from 'pinia'

interface ArticleTypeState {
  allTypes: ArticleType[]
  allTags: ArticleTag[]
}
export const useArticleTypeStore = defineStore({
  id: 'articleType',
  state: (): ArticleTypeState => ({
    allTypes: [],
    allTags: [],
  }),
  getters: {
    getAllTypes(state: ArticleTypeState): ArticleType[] {
      return state.allTypes
    },
    getAllTags(state: ArticleTypeState): ArticleTag[] {
      return state.allTags
    },
  },
  actions: {
    setAllTypes(types: ArticleType[]) {
      this.allTypes = types
    },
    setAllTags(tags: ArticleTag[]) {
      this.allTags = tags
    },
    async fetchAllTypes() {
      const result = await ArticleTypeApi.all()
      this.setAllTypes(result)
    },
    async fetchAllTags() {
      const result = await ArticleTagApi.all()
      this.setAllTags(result)
    },
    addType(type: ArticleType) {
      this.allTypes.unshift(type)
    },
    addTag(tag: ArticleTag) {
      this.allTags.unshift(tag)
    },
  },
})
