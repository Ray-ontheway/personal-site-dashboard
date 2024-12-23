import { PageObject, BaseResult } from '@api/models/common'
import { UserResp, RoleResp } from '@api/models/userModel'
import random from 'lodash/random'
import sampleSize from 'lodash/sampleSize'
import { faker } from '@faker-js/faker'

const sysRoles: RoleResp[] = [
  {
    id: 1,
    name: 'Root',
    description: '系统超级管理员, 拥有任何权限',
  },
  {
    id: 2,
    name: 'Admin',
    description: '系统管理员, 拥有大部分权限',
  },
  {
    id: 3,
    name: 'Normal',
    description: '普通用户， 可以浏览数据',
  },
]

export const allRolesResult = (): BaseResult<RoleResp[]> => ({
  status: 200,
  msg: 'success',
  data: sysRoles,
})

export const generateUserRoles = (): RoleResp[] => {
  const count = random(1, sysRoles.length)
  return sampleSize(sysRoles, count)
}

const pageUsers = (_pageIdx: number, pageSize: number): UserResp[] =>
  Array.from({ length: pageSize }).map(
    (_, idx) =>
      ({
        id: idx,
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        short_bio: faker.lorem.sentence(),
        registeredAt: faker.date.past(),
        roles: generateUserRoles(),
      }) as UserResp
  )

export const pageUserInfo = (pageIdx: number, pageSize: number): PageObject<UserResp> => {
  // const _min = (pageIdx - 1) * pageSize
  const max = pageIdx * pageSize + 50
  return {
    pageIdx: pageIdx,
    pageSize: pageSize,
    total: faker.number.int(max * 10) as number,
    data: pageUsers(pageIdx, pageSize),
  }
}

export const pageUsersResult = (pageIdx: number, pageSize: number): BaseResult => ({
  status: 200,
  msg: 'success',
  data: pageUserInfo(pageIdx, pageSize),
})

const generateUser = (_idx: string): UserResp => ({
  id: faker.number.int(1000),
  username: faker.internet.userName(),
  avatar: faker.image.avatar(),
  short_bio: faker.lorem.sentence(),
  registeredAt: faker.date.past(),
  roles: generateUserRoles(),
})

const searchUsers = (username: string): UserResp[] => {
  return Array.from({ length: 4 }).map(
    (_, idx) =>
      ({
        id: idx,
        userId: faker.string.uuid(),
        username: username + faker.internet.userName(),
        avatar: faker.image.avatar(),
        short_bio: faker.lorem.sentence(),
        registeredAt: faker.date.past(),
        roles: generateUserRoles(),
      }) as UserResp
  )
}

export const searchUserResult = (username: string): BaseResult<UserResp[]> => {
  console.log('searchUserResult', username)

  return {
    status: 200,
    msg: 'success',
    data: searchUsers(username),
  }
}

export const updateUserRolesResult = (userId: string, roleIds: number[]): BaseResult<UserResp> => {
  const user = generateUser(userId)
  user.roles = sysRoles.filter(role => roleIds.includes(role.id))
  return {
    status: 200,
    msg: 'success',
    data: user,
  }
}
