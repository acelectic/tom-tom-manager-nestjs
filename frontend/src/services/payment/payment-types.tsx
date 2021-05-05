import { UserEntity } from '../auth/auth-types'
import { ResourceEntity } from '../resource/resource-types'
import { TransactionEntity } from '../transaction/transaction-types'

export enum PaymentType {
  BUY = 'buy',
  PAID = 'paid',
}

export interface PaymentEntity {
  ref: number
  price: number
  type: PaymentType
  user: UserEntity
  resource: ResourceEntity
  transaction: TransactionEntity
  createdAt: string
}

export interface GetPaymentsResponse {
  payments: PaymentEntity[]
}

export interface CreatePaymentParams {
  price: number
  type: PaymentType
  userId: string
  transactionId: string
  resourceId: string
}
export interface CreatePaymentResponse extends PaymentEntity {}
