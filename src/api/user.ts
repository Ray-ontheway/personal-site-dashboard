import axiosClient from '@/utils/http/axios'
import { UserLogin } from '@api/models/userModel'

import { UserApiPath } from './paths'

class UserApi {
  static async login(userLogin: UserLogin) {
    return axiosClient.post(UserApiPath.LOGIN, userLogin)
  }

  static async applyOptCode(email: string) {
    return axiosClient.post(UserApiPath.OPT_CODE, { email })
  }

  static async pageUser(pageIdx: number, pageSize: number) {
    return axiosClient.get(UserApiPath.PAGE, { params: { pageIdx, pageSize } })
  }
}
