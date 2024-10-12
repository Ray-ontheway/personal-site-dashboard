import { ArticleTag, ArticleType } from '@api/models/articleModel'
import { Ref, ref, watch, watchEffect } from 'vue'
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

  // TODO 获取所有文章类型
  const syncAllArticleType = async () => {
    const types = await ArticleTypeApi.all()
    articleTypeList.value = types
  }

  // 删除文章类型
  const deleteArticleType = (type: ArticleType) => {
    ArticleTypeApi.delete(type.id).then(() => {
      console.log('删除成功')
    })
    syncAllArticleType()
  }

  return {
    articleTypeList,
    articleTypePage,

    syncPageArticleType,
    changePageIdx,
    changePageSize,
    syncAllArticleType,
    deleteArticleType,
  }
}

export const useArticleTag = () => {
  const articleTagList = ref<ArticleTag[]>([])

  const ARTICLE_TAG_DEFAULT = {
    uid: '',
    name: '',
    catKey: '',
    description: '',
  }
  const currentArticleTag = ref<ArticleTag>(ARTICLE_TAG_DEFAULT)
  const resetCurrentArticleTag = () => {
    currentArticleTag.value = ARTICLE_TAG_DEFAULT
  }
  const setCurrentArticleTag = (tag: ArticleTag) => {
    currentArticleTag.value = tag
  }

  // TODO 新增文章tag
  const saveArticleTag = async () => {
    if (currentArticleTag.value.id === undefined) {
      await ArticleTagApi.create(currentArticleTag.value)
    } else {
      await ArticleTagApi.update(currentArticleTag.value)
    }
    resetCurrentArticleTag()
    syncAllArticleTags()
    return true
  }

  const deleteArticleTag = (tag: ArticleTag) => {
    ArticleTagApi.delete(tag.id).then(() => {
      console.log('删除成功')
    })
    syncAllArticleTags()
  }

  // 获取所有文章tag
  const syncAllArticleTags = async () => {
    articleTagList.value = await ArticleTagApi.all()
  }

  return {
    articleTagList,
    currentArticleTag,

    syncAllArticleTags,
    setCurrentArticleTag,
    saveArticleTag,
    deleteArticleTag,
  }
}

// ArticleType 编辑响应式
export const useArticleTypeForm = (articleType: Ref<ArticleType | undefined>) => {
  const ARTICLE_TYPE_DEFAULT = {
    uid: '',
    name: '',
    catKey: '',
    description: '',
  }
  const currentArticleType = ref<ArticleType>(ARTICLE_TYPE_DEFAULT)

  const resolveArticleType = () => {
    if (articleType.value !== undefined) {
      currentArticleType.value = { ...articleType.value }
    } else {
      currentArticleType.value = { ...ARTICLE_TYPE_DEFAULT }
    }
  }

  watchEffect(() => {
    resolveArticleType()
  })

  const resetCurrentArticleType = () => {
    currentArticleType.value = { ...ARTICLE_TYPE_DEFAULT }
  }

  const saveArticleType = async () => {
    // 如果文章类型的id 为undefined，说明是新增的文章类型
    try {
      let type = undefined
      if (currentArticleType.value.id === undefined) {
        type = await ArticleTypeApi.create(currentArticleType.value)
      } else {
        type = await ArticleTypeApi.update(currentArticleType.value)
      }
      return Promise.resolve(type)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return {
    currentArticleType,
    resetCurrentArticleType,
    saveArticleType,
  }
}

// ArticleTag 编辑响应式
export const useArticleTagForm = (articleTag: Ref<ArticleTag | undefined>) => {
  const ARTICLE_TAG_DEFAULT = {
    uid: '',
    name: '',
    catKey: '',
    description: '',
  }
  const currentArticleTag = ref<ArticleTag>(ARTICLE_TAG_DEFAULT)

  const resolveArticleTag = () => {
    if (articleTag.value !== undefined) {
      currentArticleTag.value = { ...articleTag.value }
    } else {
      currentArticleTag.value = { ...ARTICLE_TAG_DEFAULT }
    }
  }

  watchEffect(() => {
    resolveArticleTag()
  })

  const resetCurrentArticleTag = () => {
    currentArticleTag.value = ARTICLE_TAG_DEFAULT
  }

  // TODO 新增文章tag
  const saveArticleTag = async () => {
    try {
      let tag = undefined
      if (currentArticleTag.value.id === undefined) {
        tag = await ArticleTagApi.create(currentArticleTag.value)
      } else {
        tag = await ArticleTagApi.update(currentArticleTag.value)
      }
      return Promise.resolve(tag)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    currentArticleTag,
    resetCurrentArticleTag,
    saveArticleTag,
  }
}
