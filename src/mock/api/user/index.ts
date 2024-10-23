import MockAdapter from 'axios-mock-adapter'
import { pageUsersResult, searchUserResult, allRolesResult, updateUserRolesResult } from './results'
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

  mock.onGet(UserApiPath.ALL_ROLES).reply(200, allRolesResult())

  mock.onPut(UserApiPath.UPDATE_ROLES).reply(config => {
    const { userId, roleIds } = JSON.parse(config.data)
    return [200, updateUserRolesResult(userId, roleIds)]
  })
}
