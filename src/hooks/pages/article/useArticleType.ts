import { ArticleTag, ArticleType } from '@api/models/articleModel'
import { ref } from 'vue'
import { ArticleTagApi, ArticleTypeApi } from '@/api/article'
import { PageObject } from '@/api/models/common'

export const useArticleType = () => {
  // 文章类型列表
  const articleTypeList = ref<ArticleType[]>()

  // 文章类型Page
  const articleTypePage = ref<PageObject<ArticleType>>({
    pageIdx: 1,
    pageSize: 10,
    total: 0,
    data: [],
  })
  const syncPageArticleType = () => {
    ArticleTypeApi.page(articleTypePage.value.pageIdx, articleTypePage.value.pageSize)
      .then(page => {
        articleTypePage.value = page
        console.log(page)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const changePageIdx = (pageIdx: number) => {
    articleTypePage.value.pageIdx = pageIdx
    syncPageArticleType()
  }
  const changePageSize = (pageSize: number) => {
    articleTypePage.value.pageSize = pageSize
    syncPageArticleType()
  }
  const deleteArticleType = (type: ArticleType) => {
    ArticleTypeApi.delete(type.id).then(() => {
      console.log('删除成功')
    })
    syncPageArticleType()
  }

  // TODO 获取所有文章类型
  const syncArticleTypeList = async () => {
    const types = await ArticleTypeApi.all()
    articleTypeList.value = types
  }

  const ARTICLE_TYPE_DEFAULT = {
    uid: '',
    name: '',
    catKey: '',
    description: '',
  }
  // TODO 当前编辑的文章类型
  const currentArticleType = ref<ArticleType>(ARTICLE_TYPE_DEFAULT)
  // 文章类型 设置为默认
  const resetCurrentArticleType = () => {
    currentArticleType.value = ARTICLE_TYPE_DEFAULT
  }
  // 如果是更新文章类型，需要设置当前文章类型
  const setCurrentArticleType = (type: ArticleType) => {
    currentArticleType.value = type
  }

  // TODO 保存文章类型
  const saveArticleType = async () => {
    // 如果文章类型的id 为undefined，说明是新增的文章类型
    if (currentArticleType.value.id === undefined) {
      await ArticleTypeApi.create(currentArticleType.value)
    } else {
      // 如果文章类型的id 不为undefined，则说明是更新文章类型
      await ArticleTypeApi.update(currentArticleType.value)
    }
    resetCurrentArticleType()
    return true
  }

  return {
    articleTypeList,
    currentArticleType,
    articleTypePage,

    syncPageArticleType,
    changePageIdx,
    changePageSize,
    setCurrentArticleType,
    syncArticleTypeList,
    saveArticleType,
    deleteArticleType,
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
