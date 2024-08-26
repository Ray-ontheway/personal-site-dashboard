/**
 * 最简单版的mock数据
 */
import axiosClient from '@/utils/http/axios'
import MockAdapter from 'axios-mock-adapter'
import { mockUserApi } from './api/user'
import { mockArticleApi } from './api/article'
// const modules = import.meta.glob

export function setupMock() {
  const mock = new MockAdapter(axiosClient, { delayResponse: 1000 })
  mockUserApi(mock)
  mockArticleApi(mock)
}
