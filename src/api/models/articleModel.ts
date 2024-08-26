import { UserResp } from './userModel'

export interface ArticleTag {
  id: number
  uid: string
  name: string
  description: string
}

export interface ArticleType {
  id: number
  uid: string
  name: string
  description: string
  visitCount?: number
  createAt?: Date
  updateAt?: Date
}

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

export interface Article {
  id?: string
  uid: string
  title: string
  tags: string[]
  category?: ArticleCategoryResp
  summary: string
  content: string
  visitCount?: number
  isPublished?: boolean
  createBy?: UserResp
  publishAt?: Date
  createAt?: Date
  type?: ArticleType
}

export interface ArticleEditModel {
  id?: string
  uid: string
  cover?: string
  title: string
  summary: string
  content: string
  isPublished?: boolean
  typeId?: number
  tagIds?: number[]
}

export interface ArticleTagReq {
  id?: number
  uid?: string
  name: string
}

export interface ArticleTypeReq {
  id?: number
  uid?: string
  name: string
  description: string
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
