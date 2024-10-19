import { reactive, ref } from 'vue'
import { UserApi } from '@/api/user'
import { PageObject } from '@api/models/common'
import { UserResp, RoleResp } from '@api/models/userModel'
import { ElNotification } from 'element-plus'

interface UserTableState {
  pageIdx: number
  pageSize: number
  total: number
  data: UserResp[]
}

export function useUserManager() {
  const userTableState = reactive<UserTableState>({
    pageIdx: 1,
    pageSize: 8,
    total: 0,
    data: [],
  })

  const allRoles = ref<RoleResp[]>([])

  const fetchAllRoles = () => {
    UserApi.allRoles()
      .then((roles: RoleResp[]) => {
        allRoles.value = roles
      })
      .catch(error => {
        console.log(error)
        ElNotification.error({ title: 'Error', message: 'Failed to fetch roles' })
      })
  }

  const fetchUsers = () => {
    const { pageIdx, pageSize } = userTableState
    UserApi.pageUser(pageIdx, pageSize)
      .then((userPage: PageObject<UserResp>) => {
        userTableState.data = userPage.data
        userTableState.total = userPage.total
      })
      .catch(error => {
        console.log(error)
        ElNotification.error({ title: 'Error', message: 'Failed to fetch users' })
      })
  }

  const handleCurrentPageChange = (pageIdx: number) => {
    userTableState.pageIdx = pageIdx
    fetchUsers()
  }

  const handlePageSizeChange = (pageSize: number) => {
    userTableState.pageSize = pageSize
    fetchUsers()
  }

  const searchUsers = (keyword: string) => {
    UserApi.searchUser(keyword)
      .then((users: UserResp[]) => {
        userTableState.data = users
      })
      .catch(error => {
        console.log(error)
        ElNotification.error({ title: 'Error', message: 'Failed to search users' })
      })
  }

  const denyUser = (user: UserResp) => {
    UserApi.denyUser(user.id)
      .then((user: UserResp) => {
        ElNotification.success({ title: 'Success', message: 'Deny user successfully' })
        // fetchUsers()
        // TODO 局部刷新数据
        console.log(user)
      })
      .catch(error => {
        console.log(error)
        ElNotification.error({ title: 'Error', message: 'Failed to deny user' })
      })
  }

  const updateUserRoles = (userId: number, roleIds: number[]) => {
    UserApi.updateUserRoles(userId, roleIds)
      .then((user: UserResp) => {
        userTableState.data.forEach(u => {
          if (u.id === user.id) {
            u.roles = user.roles
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return {
    userTableState,
    allRoles,
    fetchAllRoles,
    fetchUsers,
    handleCurrentPageChange,
    handlePageSizeChange,
    searchUsers,
    denyUser,
    updateUserRoles,
  }
}
