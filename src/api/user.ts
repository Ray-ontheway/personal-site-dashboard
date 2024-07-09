import axiosClient from '@/utils/http/axios'
import { UserLogin } from '@api/models/userModel'

import { UserApiPath } from './paths'
import { BaseResult, PageObject } from './models/common'
import { UserResp } from './models/userModel'

class UserApi {
  static async login(userLogin: UserLogin) {
    return axiosClient.post(UserApiPath.LOGIN, userLogin)
  }

  static async applyOptCode(email: string) {
    return axiosClient.post(UserApiPath.OPT_CODE, { email })
  }

  static async pageUser(pageIdx: number, pageSize: number): Promise<PageObject<UserResp>> {
    return axiosClient.get<PageObject<UserResp>>(UserApiPath.PAGE, { params: { pageIdx, pageSize } })
  }

  static async searchUser(username: string): Promise<BaseResult<UserResp>> {
    return axiosClient.get(UserApiPath.SEARCH, { params: { username } })
  }

  static async denyUser(userId: number) {
    return axiosClient.put(UserApiPath.DENY, { userId })
  }

  static async updateUserRoles(userId: number, roles: string[]): Promise<UserResp> {
    return axiosClient.put(UserApiPath.UPDATE_ROLES, { userId, roles })
  }
}
