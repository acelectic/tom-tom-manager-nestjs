import { sumBy } from 'lodash'
import { transformerDecimalToNumber } from 'src/utils/entity-transform'
import { debugLog } from 'src/utils/helper'
import {
  Column,
  Entity,
  DeleteDateColumn,
  Index,
  FindConditions,
  ObjectType,
  OneToMany,
  JoinColumn,
  ManyToOne,
  RelationId,
  AfterInsert,
  Connection,
  EntityManager,
  getConnection,
  Generated,
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { Resource } from './Resource'
import { Transaction } from './Transaction'
import { User } from './User'

export enum PaymentStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SETTLED = 'settled',
}

export enum PaymentType {
  BUY = 'buy',
  PAID = 'paid',
}
@Entity({ name: 'payments' })
export class Payment extends AppEntity {
  // @AfterInsert()
  // updateUserBalance() {
  //   const connection: Connection = getConnection()
  //   const etm: EntityManager = connection.createEntityManager()

  //   const paymentType = this.type
  //   const paymentAmount = this.price
  //   if (paymentType === PaymentType.PAID) {
  //     const transaction = this.transaction
  //     const { id: transactionId } = transaction
  //     etm
  //       .find(Payment, {
  //         transactionId,
  //       })
  //       .then(payments => {
  //         const sumPayment = sumBy(payments, p => p.price)
  //         transaction.remain = Math.max(transaction.price - sumPayment, 0)
  //         etm.save(transaction)
  //         if (transaction.remain <= 0) {
  //           transaction.completed = true
  //           etm.save(transaction)
  //         }
  //       })
  //   }

  //   const userId = this.userId
  //   User.findOne(userId).then(user => {
  //     user.balance = user.balance + paymentAmount
  //     etm.save(user)
  //   })
  // }
  @Column({
    name: 'price',
    type: 'numeric',
    nullable: false,
    transformer: transformerDecimalToNumber,
  })
  price: number

  @Column({
    name: 'type',
    type: 'enum',
    enum: PaymentType,
    nullable: false,
  })
  type: PaymentType

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: false,
  })
  userId: string

  @Column({
    name: 'status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    nullable: true,
  })
  status: PaymentStatus

  @Column({
    name: 'resource_id',
    type: 'uuid',
    nullable: true,
  })
  resourceId: string

  @Column({
    name: 'transaction_id',
    type: 'uuid',
    nullable: true,
  })
  transactionId: string

  @Generated('rowid')
  @Column({
    name: 'ref',
    nullable: true,
  })
  ref: string

  @ManyToOne(
    () => User,
    user => user.payments,
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User

  @ManyToOne(
    () => Transaction,
    transaction => transaction.payments,
    { nullable: true },
  )
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  transaction: Transaction

  @ManyToOne(
    () => Resource,
    resource => resource.payments,
    { nullable: true },
  )
  @JoinColumn({ name: 'resource_id', referencedColumnName: 'id' })
  resource: Resource
}
