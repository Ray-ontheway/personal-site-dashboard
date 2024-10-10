export interface PageObject<T = any> {
  pageIdx: number
  pageSize: number
  total: number
  data: T[]
}

export interface PageInfo {
  pageIdx: number
  pageSize: number
  total: number
}

export interface BaseResult<T = any> {
  status: number
  msg: string
  data: T
}
