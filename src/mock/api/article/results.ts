import { ArticleCategoryResp, ArticleTag, ArticleTagReq, ArticleTypeReq, ArticleType } from '@/api/models/articleModel'
import { faker } from '@faker-js/faker'
import { UserResp, RoleResp } from '@api/models/userModel'
import { generateUserRoles } from '../user/results'
import { BaseResult, PageObject } from '@/api/models/common'

export const generateArticleCategoryResp = (userId: string): ArticleCategoryResp => ({
  id: faker.string.uuid(),
  uid: faker.string.uuid(),
  name: faker.lorem.word(),
  summary: faker.lorem.sentence(),
  coverUri: faker.image.imageUrl(),
  articleCount: faker.number.int(100),
  visitCount: faker.number.int(1000),
  createBy: {
    id: faker.string.uuid(),
    userId: userId,
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    short_bio: faker.lorem.sentence(),
    registeredAt: faker.date.past(),
    roles: generateUserRoles() as RoleResp[],
  } as UserResp,
  createAt: faker.date.past(),
})

export const generateArticleCategoryByUserId = (userId: string): BaseResult<ArticleCategoryResp[]> => {
  return {
    status: 200,
    msg: 'success',
    data: Array.from({ length: 10 }).map(() => generateArticleCategoryResp(userId)),
  }
}

// 文章标签
export const generateArticleTag = (data: ArticleTagReq): BaseResult<ArticleTag> => {
  const tag: ArticleTag = {
    id: faker.number.int(1000),
    uid: faker.string.uuid(),
    name: data.name,
    description: 'description',
  }
  return {
    status: 200,
    msg: 'create success',
    data: tag,
  }
}
export const updateArticleTag = (data: ArticleTagReq): BaseResult<ArticleTag> => {
  const tag: ArticleTag = {
    id: data.id,
    uid: data.uid,
    name: data.name,
    description: 'description',
  }
  return {
    status: 200,
    msg: 'update success',
    data: tag,
  }
}
export const deleteArticleTag = (id: number): BaseResult<string> => {
  return {
    status: 200,
    msg: 'delete success',
    data: 'delete success',
  }
}
export const pageArticleTag = (pageIdx: number, pageSize: number): BaseResult<PageObject<ArticleTag>> => {
  return {
    status: 200,
    msg: 'success',
    data: {
      pageIdx: pageIdx,
      pageSize: pageSize,
      total: faker.number.int(100),
      data: Array.from({ length: pageSize }).map(() => {
        return {
          id: faker.number.int(1000),
          uid: faker.string.uuid(),
          name: faker.lorem.word(),
          description: 'description',
        }
      }),
    },
  }
}

// 文章类型
export const generateArticleType = (data: ArticleTypeReq): BaseResult<ArticleType> => {
  const type: ArticleType = {
    id: faker.number.int(1000),
    uid: faker.string.uuid(),
    name: data.name,
    description: 'description',
  }
  return {
    status: 200,
    msg: 'create success',
    data: type,
  }
}
export const updateArticleType = (data: ArticleTypeReq): BaseResult<ArticleType> => {
  const type: ArticleType = {
    id: data.id,
    uid: data.uid,
    name: data.name,
    description: 'description',
  }
  return {
    status: 200,
    msg: 'create success',
    data: type,
  }
}
export const deleteArticleType = (id: number): BaseResult<string> => {
  console.log(`id: ${id}`)
  return {
    status: 200,
    msg: 'delete success',
    data: 'delete success',
  }
}
export const pageArticleType = (pageIdx: number, pageSize: number): BaseResult<PageObject<ArticleType>> => {
  return {
    status: 200,
    msg: 'success',
    data: {
      pageIdx: pageIdx,
      pageSize: pageSize,
      total: faker.number.int(100),
      data: Array.from({ length: pageSize }).map(() => {
        return {
          id: faker.number.int(1000),
          uid: faker.string.uuid(),
          name: faker.lorem.word(),
          description: 'description',
        }
      }),
    },
  }
}

// 文章
