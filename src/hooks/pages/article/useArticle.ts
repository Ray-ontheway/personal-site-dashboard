import { ArticleResp, ArticleEditModel, ArticleUpdateReq, ArticleTag, ArticleType } from '@/api/models/articleModel'
import { computed, ref, toRef } from 'vue'
import { useArticleStore } from '@/store/modules/article'

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

  return {
    articlePage,
    articleDrafts,

    syncArticlePage,
    syncDrafts,
    syncEssaysPage,
    changePageIdx,
    changePageSize,
    deleteArticle,
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

  const editorArticle = computed(() => {
    return article.value === undefined
      ? DEFAULT_ARTICLE
      : ({
          ...article.value,
        } as ArticleEditModel)
  })
  const isDraft = ref(!editorArticle.value.isPublished)

  const saveArticle = articleStore.saveArticle

  const saveAsDraft = () => {
    const articleReq: ArticleUpdateReq = {
      id: editorArticle.value.id,
      uid: editorArticle.value.uid,
      title: editorArticle.value.title,
      summary: editorArticle.value.summary,
      content: editorArticle.value.content,
      typeId: editorType.value?.id || undefined,
      tagIds: editorTags.value.map(tag => tag.id),
      isPublished: false,
      cover: '',
      createBy: 0,
    }
    saveArticle(articleReq)
  }
  const publish = () => {
    console.log('publish')

    const articleReq: ArticleUpdateReq = {
      id: editorArticle.value.id,
      uid: editorArticle.value.uid,
      title: editorArticle.value.title,
      summary: editorArticle.value.summary,
      content: editorArticle.value.content,
      typeId: editorType.value?.id || undefined,
      tagIds: editorTags.value.map(tag => tag.id),
      isPublished: true,
      cover: '',
      createBy: 0,
    }
    saveArticle(articleReq)
  }

  articleStore
    .findArticleByUID(articleUID)
    .then(res => {
      article.value = res
      editorType.value = res.type
      editorTags.value = res.tags
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
    publish,
  }
}
