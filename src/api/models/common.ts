export interface PageObject<T> {
  pageIdx: number
  pageSize: number
  data: T[]
}
