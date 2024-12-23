import {
  ArticleCategoryResp,
  ArticleTag,
  ArticleTagCreateReq,
  ArticleTypeCreateReq,
  ArticleType,
  ArticleResp,
  ArticleCreateReq,
  ArticleTagUpdateReq,
  ArticleTypeUpdateReq,
} from '@/api/models/articleModel'
import { faker } from '@faker-js/faker'
import { UserResp } from '@api/models/userModel'
import { BaseResult, PageObject } from '@/api/models/common'

export const generateArticleCategoryResp = (_userId: string): ArticleCategoryResp => ({
  id: faker.string.uuid(),
  uid: faker.string.uuid(),
  name: faker.lorem.word(),
  summary: faker.lorem.sentence(),
  coverUri: faker.image.imageUrl(),
  articleCount: faker.number.int(100),
  visitCount: faker.number.int(1000),
  createBy: {
    id: 1,
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    short_bio: faker.lorem.sentence(),
    registeredAt: faker.date.past(),
    roles: [
      {
        id: 0,
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
      },
    ],
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

// 文章
export const pageArticle = (pageIdx: number, pageSize: number): BaseResult<PageObject<ArticleResp>> => {
  return {
    status: 200,
    msg: 'success',
    data: {
      pageIdx: pageIdx,
      pageSize: pageSize,
      total: faker.number.int(100),
      data: Array.from({ length: pageSize }).map(
        (it: number): ArticleResp => ({
          id: it,
          uid: faker.string.uuid(),
          title: faker.lorem.word(),
          summary: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          cover: '',

          type: {
            id: faker.number.int(1000),
            uid: faker.string.uuid(),
            name: faker.lorem.word(),
            catKey: faker.string.uuid().substring(0, 8),
            description: 'description',
          },
          tags: [],

          visitedCount: faker.number.int(50),
          isPublished: faker.number.int(10) % 2 === 0,

          author: {
            id: 1,
            username: faker.internet.userName(),
            avatar: faker.image.avatar(),
            short_bio: faker.lorem.sentence(),
            registeredAt: faker.date.past(),
            roles: [
              {
                id: 0,
                name: faker.lorem.word(),
                description: faker.lorem.sentence(),
              },
            ],
          },
          updateAt: faker.date.past(),
        })
      ),
    },
  }
}

export const deleteArticle = (uid: string): BaseResult<string> => {
  return {
    status: 200,
    msg: `delete ${uid} success`,
    data: 'delete success',
  }
}

export const createArticle = (articleReq: ArticleCreateReq): BaseResult<ArticleResp> => {
  return {
    status: 200,
    msg: 'create success',
    data: {
      id: faker.number.int(1000),
      uid: faker.string.uuid(),
      title: articleReq.title,
      summary: articleReq.summary,
      content: articleReq.content,
      type: {
        id: faker.number.int(1000),
        uid: faker.string.uuid(),
        name: 'type',
        catKey: faker.string.uuid().substring(0, 8),
        description: 'description',
      },
      tags: [],
      isPublished: articleReq.isPublished,
      author: {},
    } as ArticleResp,
  }
}

// 文章标签
export const generateArticleTag = (data: ArticleTagCreateReq): BaseResult<ArticleTag> => {
  const tag: ArticleTag = {
    id: faker.number.int(1000),
    uid: faker.string.uuid(),
    name: data.name,
    catKey: faker.string.uuid().substring(0, 8),
    description: 'description',
  }
  return {
    status: 200,
    msg: 'create success',
    data: tag,
  }
}
export const updateArticleTag = (data: ArticleTagUpdateReq): BaseResult<ArticleTag> => {
  const tag: ArticleTag = {
    id: data.id,
    uid: data.uid,
    catKey: faker.string.uuid().substring(0, 8),
    name: data.name,
    description: 'description',
  }
  return {
    status: 200,
    msg: 'update success',
    data: tag,
  }
}
export const deleteArticleTag = (_id: number): BaseResult<string> => {
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
          catKey: faker.string.uuid().substring(0, 8),
          description: 'description',
        }
      }),
    },
  }
}
export const allArticleTags = (): BaseResult<ArticleTag[]> => {
  return {
    status: 200,
    msg: 'success',
    data: Array.from({ length: 10 }).map(() => {
      return {
        id: faker.number.int(1000),
        uid: faker.string.uuid(),
        name: faker.lorem.word(),
        catKey: faker.string.uuid().substring(0, 8),
        description: 'description',
      }
    }),
  }
}

// 文章类型
export const generateArticleType = (data: ArticleTypeCreateReq): BaseResult<ArticleType> => {
  const type: ArticleType = {
    id: faker.number.int(1000),
    uid: faker.string.uuid(),
    name: data.name,
    catKey: faker.string.uuid().substring(0, 8),
    description: 'description',
  }
  return {
    status: 200,
    msg: 'create success',
    data: type,
  }
}
export const updateArticleType = (data: ArticleTypeUpdateReq): BaseResult<ArticleType> => {
  const type: ArticleType = {
    id: data.id,
    uid: data.uid,
    name: data.name,
    catKey: faker.string.uuid().substring(0, 8),
    description: 'description',
  }
  return {
    status: 200,
    msg: 'create success',
    data: type,
  }
}
export const deleteArticleType = (id: number): BaseResult<string> => {
  console.log(`正在删除 id: ${id} 的文章类型`)
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
          catKey: faker.string.uuid().substring(0, 8),
          description: 'description',
        }
      }),
    },
  }
}
export const allArticleType = (): BaseResult<ArticleType[]> => {
  return {
    status: 200,
    msg: 'success',
    data: Array.from({ length: 10 }).map(() => {
      return {
        id: faker.number.int(1000),
        uid: faker.string.uuid(),
        name: faker.lorem.word(),
        catKey: faker.string.uuid().substring(0, 8),
        description: 'description',
      }
    }),
  }
}

// 文章
