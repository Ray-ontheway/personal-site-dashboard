import { ArticleResp, ArticleEditModel, ArticleUpdateReq, ArticleTag, ArticleType } from '@/api/models/articleModel'
import { computed, ref, toRef } from 'vue'
import { useArticleStore } from '@/store/modules/article'
import { ElNotification } from 'element-plus'

export const useArticle = () => {
  const articleStore = useArticleStore()

  // 1. 文章分页程序
  const articlePage = computed(() => articleStore.getCurArticlePage)
  const articleDrafts = computed(() => articleStore.getDrafts)

  const syncDrafts = articleStore.syncDrafts
  const syncEssaysPage = articleStore.essaysPage
  const syncArticlePage = articleStore.fetchCurArticlePage
  const changePageIdx = articleStore.changePageIdx
  const changePageSize = articleStore.changePageSize

  // 3. 删除文章
  const deleteArticle = articleStore.deleteArticle

  const publish = (uid: string) => {
    articleStore
      .publish(uid)
      .then((res: ArticleResp) => {
        ElNotification({
          title: '成功',
          message: `文章 ${res.title} 发布成功`,
          type: 'success',
        })
      })
      .catch(() => {})
  }

  return {
    articlePage,
    articleDrafts,

    syncArticlePage,
    syncDrafts,
    syncEssaysPage,
    changePageIdx,
    changePageSize,
    deleteArticle,
    publish,
  }
}

export const useArticleEditor = (
  allTypes: ArticleType[],
  allTags: ArticleTag[],
  articleUID: string | undefined = undefined
) => {
  const articleStore = useArticleStore()

  const curTypes = toRef<ArticleType[]>(allTypes)
  const curTags = toRef<ArticleTag[]>(allTags)
  const article = ref<ArticleResp | undefined>(undefined)

  const curEditorType = ref<ArticleType | undefined>(undefined)
  const editorType = computed({
    get: () => {
      return curEditorType.value
    },
    set: (type: ArticleType) => {
      curEditorType.value = type
    },
  })
  const curEditorTag = ref<ArticleTag[] | undefined>(undefined)
  const editorTags = computed({
    get: () => {
      return curEditorTag.value
    },
    set: (tags: ArticleTag[]) => {
      curEditorTag.value = tags
    },
  })
  const DEFAULT_ARTICLE = {
    uid: '',
    title: '',
    summary: '',
    content: '',
    isPublished: false,
  } as ArticleEditModel

  const editorArticle = ref<ArticleEditModel>(DEFAULT_ARTICLE)
  const isDraft = computed(() => {
    if (editorArticle.value === undefined) {
      return true
    }
    return editorArticle.value.isPublished === false
  })

  const saveArticle = articleStore.saveArticle
  const doSave = (articleReq: ArticleUpdateReq) => {
    saveArticle(articleReq)
      .then(res => {
        updateArticle(res)
        ElNotification({
          title: '成功',
          message: '文章保存成功',
          type: 'success',
        })
      })
      .catch(() => {})
  }

  const transformEditorArticleToUpdateReq = (curArticle: ArticleEditModel): ArticleUpdateReq => {
    const articleReq: ArticleUpdateReq = {
      ...curArticle,
      cover: curArticle.cover || '',
      createBy: article.value?.author.id || 0,
      typeId: editorType.value?.id || undefined,
      tagIds: editorTags.value.map(tag => tag.id),
      isPublished: true,
    }
    return articleReq
  }

  const saveAsDraft = () => {
    const articleReq = transformEditorArticleToUpdateReq(editorArticle.value)
    articleReq.isPublished = false
    doSave(articleReq)
  }
  const saveAsEssay = () => {
    const articleReq = transformEditorArticleToUpdateReq(editorArticle.value)
    doSave(articleReq)
  }

  const updateArticle = (articleResp: Nullable<ArticleResp>) => {
    if (articleResp === null) {
      return
    }
    editorArticle.value = {
      id: articleResp.id,
      uid: articleResp.uid,
      title: articleResp.title,
      summary: articleResp.summary,
      content: articleResp.content,
      cover: articleResp.cover,
      isPublished: articleResp.isPublished,
      typeId: articleResp.type.id,
      tagIds: articleResp.tags.map(tag => tag.id),
    }
    editorType.value = articleResp.type
    editorTags.value = articleResp.tags
  }

  articleStore
    .findArticleByUID(articleUID)
    .then((res: Nullable<ArticleResp>) => {
      updateArticle(res)
    })
    .catch(_ => {
      article.value = undefined
    })

  return {
    curTags,
    curTypes,

    editorArticle,
    editorType,
    editorTags,

    isDraft,

    saveAsDraft,
    saveAsEssay,
  }
}
