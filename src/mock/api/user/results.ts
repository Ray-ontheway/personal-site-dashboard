import PageObject from '@api/models/common'
import { UserResp, RoleResp } from '@api/models/userModel'

import { faker } from '@faker-js/faker'

const sysRoles = [
  {
    id: '1',
    name: 'Root',
    description: '系统超级管理员, 拥有任何权限',
  },
  {
    id: '2',
    name: 'Admin',
    description: '系统管理员, 拥有大部分权限',
  },
  {
    id: '3',
    name: 'Normal',
    description: '普通用户， 可以浏览数据',
  },
]

const generateUserRoles: RoleResp[] = () => {
  faker.seed(3)
  const rolesCount = faker.number.int()
  const roles = Array.from({ length: rolesCount }).map((_, idx) => {
    faker.seed(2)
    const roleIdx = faker.index.int()
    return sysRoles[roleIdx]
  })
  return roles
}

const pageUsers = Array.from({ length: 10 }).map(
  (_, idx) =>
    ({
      id: idx + '',
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      short_bio: faker.lorem.sentence(),
      registeredAt: faker.date.past(),
      roles: generateUserRoles(),
    }) as UserResp
)

export const pageUserInfo: PageObject<UserResp> = {
  pageIdx: 1,
  pageSize: 10,
  data: pageUsers,
}
