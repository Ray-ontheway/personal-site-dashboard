import {
  ArticleTag,
  ArticleTagCreateReq,
  ArticleTagUpdateReq,
  ArticleType,
  ArticleTypeCreateReq,
  ArticleTypeUpdateReq,
} from '@api/models/articleModel'
import { computed, Ref, ref, watchEffect } from 'vue'
import { ArticleTagApi, ArticleTypeApi } from '@/api/article'
import { useArticleTypeStore } from '@/store/modules/articleType'

export const useArticleType = () => {
  const articleTypeStore = useArticleTypeStore()

  // 文章类型列表
  const articleTypeList = computed(() => articleTypeStore.getAllTypes)

  // 同步所有数据
  const syncAllArticleTypes = articleTypeStore.fetchAllTypes

  // 删除文章类型
  const deleteArticleType = (type: ArticleType) => {
    ArticleTypeApi.delete(type.id).then(() => {
      console.log('删除成功')
    })
  }

  const addType = articleTypeStore.addType

  return {
    articleTypeList,

    addType,
    syncAllArticleTypes,
    deleteArticleType,
  }
}

export const useArticleTag = () => {
  const articleTypeStore = useArticleTypeStore()

  const articleTagList = computed(() => articleTypeStore.getAllTags)

  const deleteArticleTag = (tag: ArticleTag) => {
    ArticleTagApi.delete(tag.id).then(() => {
      console.log('删除成功')
    })
    syncAllArticleTags()
  }

  // 获取所有文章tag
  const syncAllArticleTags = articleTypeStore.fetchAllTags

  const addTag = articleTypeStore.addTag

  return {
    articleTagList,

    addTag,
    syncAllArticleTags,
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
        type = await ArticleTypeApi.create(currentArticleType.value as ArticleTypeCreateReq)
      } else {
        type = await ArticleTypeApi.update(currentArticleType.value as ArticleTypeUpdateReq)
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
        tag = await ArticleTagApi.create(currentArticleTag.value as ArticleTagCreateReq)
      } else {
        tag = await ArticleTagApi.update(currentArticleTag.value as ArticleTagUpdateReq)
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
