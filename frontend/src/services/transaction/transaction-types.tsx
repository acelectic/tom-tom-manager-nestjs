import { UserEntity } from '../auth/auth-types'
import { ResourceEntity } from '../resource/resource-types'

export interface TransactionEntity {
  id: string
  ref: number
  detail: string
  price: number
  remain: number
  users?: UserEntity[]
  resources?: ResourceEntity[]
  createdAt: string
  completed: boolean
}
export interface GetTransactionsParams {
  userId?: string
}

export interface GetTransactionsResponse {
  transactions: TransactionEntity[]
}

export interface GetTransactionsHistoryResponse {
  transactions: Omit<TransactionEntity, 'users' | 'resources'>[]
}

export interface CreateTransactionParams {
  userIds: string[]
  templateId: string
}
export interface CreateTransactionResponse extends TransactionEntity {}
