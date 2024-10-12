import { PageObject } from '@/api/models/common'
import { Article, ArticleEditModel, ArticleReq, ArticleTag, ArticleType } from '@/api/models/articleModel'
import { ArticleAPI } from '@/api/article'
import { ref, toRef, toRefs } from 'vue'

export const useArticle = () => {
  // 1. 文章分页程序
  const articlePage = ref<PageObject<Article>>({
    pageIdx: 1,
    pageSize: 10,
    total: 100,
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
  const saveArticle = async (article: ArticleReq) => {
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
  const deleteArticle = async (article: Article) => {
    const result = await ArticleAPI.delete(article.uid)
    console.log(result)
    syncArticlePage()
  }

  return {
    articlePage,
    syncArticlePage,
    changePageIdx,
    changePageSize,
    saveArticle,
    deleteArticle,
  }
}

export const useArticleEditor = (
  allTypes: ArticleType[],
  allTags: ArticleTag[],
  article: Article | undefined = undefined
) => {
  const curTypes = toRef<ArticleType[]>(allTypes)
  const curTags = toRef<ArticleTag[]>(allTags)

  const editorType = ref<ArticleType | null>(article?.type || null)
  const editorTags = ref<ArticleTag[]>(
    (article?.tags || []).map(tagName => allTags.find(tag => tag.name === tagName) as ArticleTag)
  )
  const DEFAULT_ARTICLE = {
    uid: '',
    title: '',
    summary: '',
    content: '',
    isPublished: true,
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

  const saveAsDraft = () => {
    ArticleAPI.create({
      id: editorArticle.value.id,
      uid: editorArticle.value.uid,
      title: editorArticle.value.title,
      summary: editorArticle.value.summary,
      content: editorArticle.value.content,
      typeId: editorType.value?.id || undefined,
      tagIds: editorTags.value.map(tag => tag.id),
      isPublish: false,
    }).then(() => {
      console.log('save as draft')
    })
  }
  const publish = () => {
    console.log(`publish: ${editorArticle.value}`)
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
