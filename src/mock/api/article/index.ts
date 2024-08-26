import MockAdapter from 'axios-mock-adapter'
import {
  generateArticleCategoryByUserId,
  generateArticleTag,
  updateArticleTag,
  deleteArticleTag,
  pageArticleType,
  deleteArticleType,
  updateArticleType,
  generateArticleType,
} from './results'
import { ArticleApiPath, ArticleTagApiPath, ArticleTypeApiPath } from '@/api/paths'
import { ArticleTypeApi } from '@/api/article'

export function mockArticleApi(mock: MockAdapter) {
  mock.onGet(/\/api\/article\/all([0-9a-zA-Z]*)/).reply(config => {
    const match = config.url?.match(/\/api\/article\/all\/([0-9a-zA-Z]*)/)
    const userId = match ? match[1] : ''
    return [200, generateArticleCategoryByUserId(userId)]
  })
}

export function mockAriticleTagApi(mock: MockAdapter) {
  mock.onPost(ArticleTagApiPath.CREATE).reply(config => {
    const data = JSON.parse(config.data)
    return [200, generateArticleTag(data)]
  })

  mock.onPut(ArticleTagApiPath.UPDATE).reply(config => {
    const data = JSON.parse(config.data)
    return [200, updateArticleTag(data)]
  })

  mock.onDelete(ArticleTagApiPath.DELETE).reply(config => {
    const id = config.params.id
    return [200, deleteArticleTag(id)]
  })
}

export function mockArticleTypeApi(mock: MockAdapter) {
  mock.onGet(ArticleTypeApiPath.CREATE).reply(config => {
    const data = JSON.parse(config.data)
    return [200, generateArticleType(data)]
  })

  mock.onPut(ArticleTypeApiPath.UPDATE).reply(config => {
    const data = JSON.parse(config.data)
    return [200, updateArticleType(data)]
  })

  mock.onDelete(ArticleTypeApiPath.DELETE).reply(config => {
    const id = config.params.id
    return [200, deleteArticleType(id)]
  })

  mock.onGet(ArticleTypeApiPath.PAGE).reply(config => {
    const pageIdx = config.params.pageIdx
    const pageSize = config.params.pageSize
    return [200, pageArticleType(pageIdx, pageSize)]
  })
}
