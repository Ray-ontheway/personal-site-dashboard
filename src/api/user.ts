import axiosClient from '@/utils/http/axios'
import { RoleResp, UserLogin } from '@api/models/userModel'

import { UserApiPath } from './paths'
import { PageObject } from './models/common'
import { UserResp, LoginResult } from './models/userModel'

export class UserApi {
  static async login(userLogin: UserLogin): Promise<LoginResult> {
    return axiosClient.post(UserApiPath.LOGIN, userLogin)
  }

  static async applyOptCode(email: string) {
    return axiosClient.post(UserApiPath.OPT_CODE, { email })
  }

  static async pageUser(pageIdx: number, pageSize: number): Promise<PageObject<UserResp>> {
    return axiosClient.get<PageObject<UserResp>>(UserApiPath.PAGE, { params: { pageIdx, pageSize } })
  }

  static async searchUser(username: string): Promise<UserResp[]> {
    return axiosClient.get(UserApiPath.SEARCH, { params: { username } })
  }

  static async denyUser(userId: number) {
    return axiosClient.put(UserApiPath.DENY, { userId })
  }

  static async updateUserRoles(userId: number, roleIds: number[]): Promise<UserResp> {
    return axiosClient.put(UserApiPath.UPDATE_ROLES, { userId, roleIds })
  }

  static async allRoles(): Promise<RoleResp[]> {
    return axiosClient.get(UserApiPath.ALL_ROLES)
  }
}
