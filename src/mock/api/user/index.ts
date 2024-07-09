import MockAdapter from 'axios-mock-adapter'
import { pageUsersResult, searchUserResult } from './results'
import { UserApiPath } from '@api/paths'

export function mockUserApi(mock: MockAdapter) {
  mock.onGet('/api/user/page').reply(config => {
    const { pageIdx, pageSize } = config.params
    return [200, pageUsersResult(pageIdx, pageSize)]
  })

  mock.onGet(UserApiPath.SEARCH).reply(config => {
    const { username } = config.params
    return [200, searchUserResult(username)]
  })
}
