import MockAdapter from 'axios-mock-adapter'
import { pageUserInfo } from './results'

export function mockUserApi(mock: MockAdapter) {
  mock.onGet('/api/user/page').reply(200, {
    pageUserInfo,
  })
}
