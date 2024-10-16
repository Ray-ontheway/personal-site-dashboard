import axiosClient from '@/utils/http/axios'

import type {
  ArticleCreateReq,
  ArticleUpdateReq,
  ArticleResp,
  ArticleTag,
  ArticleTagCreateReq,
  ArticleTagUpdateReq,
  ArticleType,
  ArticleTypeCreateReq,
  ArticleTypeUpdateReq,
} from './models/articleModel'

import { ArticleApiPath, ArticleTagApiPath, ArticleTypeApiPath } from './paths'
import { PageObject } from './models/common'

export class ArticleAPI {
  // 获取用户的全部列表
  static async allByUser(uid: string) {
    return axiosClient.get(`${ArticleApiPath.ALL_BY_USER}${uid}`)
  }

  // 1. 创建新文章
  static async create(data: ArticleCreateReq) {
    return axiosClient.post(ArticleApiPath.CREATE, data)
  }
  // 2. 更新文章
  static async update(data: ArticleUpdateReq) {
    return axiosClient.put(ArticleApiPath.UPDATE, data)
  }
  // 3. 删除文章
  static async delete(uid: string) {
    return axiosClient.delete(`${ArticleApiPath.DELETE}/${uid}`)
  }
  // 4. 分页查询文章
  static async page(pageIdx: number, pageSize: number) {
    return axiosClient.get(ArticleApiPath.PAGE, {
      params: {
        pageIdx: pageIdx,
        pageSize: pageSize,
      },
    })
  }
  // 5. 查询文章详情
  static async detail(uid: string) {
    return axiosClient.get(`${ArticleApiPath.DETAIL}/${uid}`)
  }
}

export class ArticleTagApi {
  // 1. 创建新的标签
  static async create(data: ArticleTagCreateReq): Promise<ArticleTag> {
    return axiosClient.post(ArticleTagApiPath.CREATE, data)
  }
  // 2. 更新标签
  static async update(data: ArticleTagUpdateReq): Promise<ArticleTag> {
    return axiosClient.put(ArticleTagApiPath.UPDATE, data)
  }
  // 3. 删除标签
  static async delete(id: number) {
    return axiosClient.delete(`${ArticleTagApiPath.DELETE}/${id}`)
  }
  // 4. 分页查询标签
  static async page(pageIdx: number, pageSize: number): Promise<PageObject<ArticleTag>> {
    return axiosClient.get(ArticleTagApiPath.PAGE, {
      params: {
        pageIdx: pageIdx,
        pageSize: pageSize,
      },
    })
  }
  // 5. 查询全部标签
  static async all(): Promise<ArticleTag[]> {
    return axiosClient.get(ArticleTagApiPath.ALL)
  }
}

export class ArticleTypeApi {
  // 1. 创建新的类型
  static async create(data: ArticleTypeCreateReq): Promise<ArticleType> {
    return axiosClient.post(ArticleTypeApiPath.CREATE, data)
  }
  // 2. 更新类型
  static async update(data: ArticleTypeUpdateReq): Promise<ArticleType> {
    return axiosClient.put(ArticleTypeApiPath.UPDATE, data)
  }
  // 3. 删除类型
  static async delete(id: number) {
    return axiosClient.delete(`${ArticleTypeApiPath.DELETE}/${id}`)
  }
  // 4. 分页查询类型
  static async page(pageIdx: number, pageSize: number): Promise<PageObject<ArticleType>> {
    return axiosClient.get(ArticleTypeApiPath.PAGE, {
      params: {
        pageIdx: pageIdx,
        pageSize: pageSize,
      },
    })
  }
  // 5. 查询全部的类型，目前不打算做分页了，个人网站的类型会很少
  static async all(): Promise<ArticleType[]> {
    return axiosClient.get(ArticleTypeApiPath.ALL)
  }
}
