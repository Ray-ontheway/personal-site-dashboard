export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface TransactionCategoryCreate {
  name: string
  comment: Nullable<string>
  parentId: Nullable<number>
}

export interface TransactionCategory extends Omit<TransactionCategoryCreate, 'parentId'> {
  id: Nullable<number>
  uid: string
  parent: Nullable<TransactionCategory>
  children: TransactionCategory[]
  date: Date
}

export interface TransactionCreate {
  name: string
  type: TransactionType
}

export interface Transaction {
  id: number
  uid: string
  mainCategory: Nullable<TransactionCategory>
  subcategory: Nullable<TransactionCategory>
  amount: number
  comment: Nullable<string>
  date: Date
}
