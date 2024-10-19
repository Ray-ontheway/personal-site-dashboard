import { ArticleResp, ArticleEditModel, ArticleUpdateReq, ArticleTag, ArticleType } from '@/api/models/articleModel'
import { computed, ref, toRef } from 'vue'
import { useArticleStore } from '@/store/modules/article'

export const useArticle = () => {
  const articleStore = useArticleStore()

  // 1. 文章分页程序
  const articlePage = computed(() => articleStore.getCurArticlePage)
  const articleDrafts = computed(() => articleStore.getDrafts)

  const curEditArticle = computed(() => articleStore.getCurEditArticle)

  const syncDrafts = articleStore.syncDrafts

  const syncEssaysPage = articleStore.essaysPage

  const syncArticlePage = articleStore.fetchCurArticlePage

  const changePageIdx = articleStore.changePageIdx
  const changePageSize = articleStore.changePageSize

  // 3. 删除文章
  const deleteArticle = articleStore.deleteArticle

  const setCurEditArticle = articleStore.setCurEditArticle

  return {
    articlePage,
    curEditArticle,
    articleDrafts,

    syncArticlePage,
    syncDrafts,
    syncEssaysPage,
    changePageIdx,
    changePageSize,
    deleteArticle,
    setCurEditArticle,
  }
}

export const useArticleEditor = (
  allTypes: ArticleType[],
  allTags: ArticleTag[],
  article: ArticleResp | undefined = undefined
) => {
  const articleStore = useArticleStore()

  const curTypes = toRef<ArticleType[]>(allTypes)
  const curTags = toRef<ArticleTag[]>(allTags)

  const editorType = ref<ArticleType | null>(article?.type || null)
  const editorTags = ref<ArticleTag[]>(
    (article?.tags || []).map(tagName => allTags.find(tag => tag.name === tagName.name) as ArticleTag)
  )
  const DEFAULT_ARTICLE = {
    uid: '',
    title: '',
    summary: '',
    content: '',
    isPublished: false,
  } as ArticleEditModel
  const editorArticle = ref<ArticleEditModel>(
    article === undefined
      ? DEFAULT_ARTICLE
      : ({
          id: article.id,
          uid: article.uid,
          title: article.title,
          summary: article.summary,
          content: article.content,
          isPublished: article.isPublished,
        } as ArticleEditModel)
  )
  const isDraft = ref(!editorArticle.value.isPublished)

  const saveArticle = articleStore.saveArticle

  const saveAsDraft = () => {
    console.log('saveAsDraft')

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
