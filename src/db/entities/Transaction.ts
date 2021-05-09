import { transformerDecimalToNumber } from 'src/utils/entity-transform'
import { debugLog, roundUpOnly } from 'src/utils/helper'
import {
  Column,
  Entity,
  DeleteDateColumn,
  Index,
  FindConditions,
  ObjectType,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  AfterInsert,
  getConnection,
  Connection,
  EntityManager,
  AfterUpdate,
  Generated,
  OneToOne,
  RelationId,
  ManyToOne,
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { Payment } from './Payment'
import { Resource } from './Resource'
import { Template } from './Template'
import { User } from './User'

@Entity({ name: 'transactions' })
export class Transaction extends AppEntity {
  // @AfterInsert()
  // updateUserBalance() {
  //   const connection: Connection = getConnection()
  //   const etm: EntityManager = connection.createEntityManager()

  //   const transaction = this
  //   const users = transaction.users
  //   const trPrice = transaction.price
  //   transaction.remain = transaction.price

  //   const mustPay = roundUpOnly(trPrice / users.length)
  //   users.map(user => {
  //     const userBalance = user.balance
  //     user.balance = userBalance - mustPay
  //     etm.save(user)
  //   })
  //   etm.save(transaction)
  // }

  // @AfterUpdate()
  // onUpdate() {
  //   const connection: Connection = getConnection()
  //   const etm: EntityManager = connection.createEntityManager()

  //   const transaction = this
  //   if (Number(transaction.remain) <= 0) {
  //     transaction.completed = true
  //   }
  //   etm.save(transaction)
  // }

  @Column({
    name: 'price',
    type: 'numeric',
    nullable: false,
    transformer: transformerDecimalToNumber,
  })
  price: number

  @Column({
    name: 'remain',
    type: 'numeric',
    nullable: false,
    default: 0,
    transformer: transformerDecimalToNumber,
  })
  remain: number

  @Column({ name: 'detail', nullable: true })
  detail: string

  @Column({ name: 'completed', type: 'boolean', default: false, nullable: true })
  completed: boolean

  @Generated('rowid')
  @Column({
    name: 'ref',
    nullable: true,
  })
  ref: string

  @ManyToMany(
    () => User,
    users => users.transactions,
  )
  @JoinTable({
    name: 'users_transactions',
    joinColumn: {
      name: 'transactionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users: User[]
  // @RelationId((transaction: Transaction) => transaction.users)
  // userIds: string[]

  @OneToMany(
    () => Payment,
    payments => payments.transaction,
    {
      cascade: true,
    },
  )
  payments: Payment[]

  @ManyToOne(
    () => Template,
    template => template.transactions,
    {
      lazy: true,
      nullable: true,
    },
  )
  template: Template
  @RelationId((transaction: Transaction) => transaction.template)
  templateId: string
}
