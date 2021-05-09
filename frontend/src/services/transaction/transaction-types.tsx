import { Dayjs } from 'dayjs'
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
export interface GetTransactionsParams extends PaginationParams {
  userId?: string
}

export interface GetTransactionsResponse
  extends Pagination<TransactionEntity> {}

export interface GetTransactionsHistoryParams {
  startDate?: string
  endDate?: string
  status?: boolean
  userId?: string
}
export interface GetTransactionsHistoryResponse {
  transactions: Omit<TransactionEntity, 'resources'>[]
}

export interface CreateTransactionParams {
  userIds: string[]
  templateId: string
}
export interface CreateTransactionResponse extends TransactionEntity {}
