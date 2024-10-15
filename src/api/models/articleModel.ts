import { UserResp } from './userModel'

export interface ArticleCategoryResp {
  id: string
  uid: string
  name: string
  summary: string
  coverUri: string
  articleCount: number
  visitCount: number
  createBy: UserResp
  createAt: Date
}

export interface ArticleReq {
  id?: number
  uid?: string
  title: string
  summary: string
  content: string
  typeId: number
  tagIds: number[]
  isPublish: boolean
}

export interface Article {
  id?: number
  uid: string
  title: string
  summary: string
  content: string

  cover?: string

  type?: ArticleType
  tags?: string[]

  visitCount?: number
  isPublished?: boolean

  createBy?: UserResp
  publishAt?: Date
  createAt?: Date
}

export interface ArticleEditModel {
  id?: number
  uid: string
  cover?: string
  title: string
  summary: string
  content: string
  isPublished?: boolean
  typeId?: number
  tagIds?: number[]
}

export interface ArticleTagCreateReq {
  name: string
  catKey: string
  description: string
}
export interface ArticleTagUpdateReq extends ArticleTagCreateReq {
  id?: number
  uid?: string
}
export interface ArticleTag extends ArticleTagUpdateReq {
  visitCount?: number
  createAt?: Date
  updateAt?: Date
}

export interface ArticleTypeCreateReq {
  name: string
  catKey: string
  description: string
}
export interface ArticleTypeUpdateReq extends ArticleTypeCreateReq {
  id?: number
  uid?: string
}
export interface ArticleType extends ArticleTypeUpdateReq {
  visitCount?: number
  createAt?: Date
  updateAt?: Date
}
