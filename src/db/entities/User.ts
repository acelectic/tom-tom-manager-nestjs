import {
  Column,
  Entity,
  DeleteDateColumn,
  Index,
  FindConditions,
  ObjectType,
  ManyToOne,
  OneToMany,
  JoinTable,
  JoinColumn,
  ViewColumn,
  ViewEntity,
  Connection,
  ManyToMany,
  RelationId,
  EntityManager,
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { Role } from '../../modules/auth/auth.constant'
import { Transaction } from './Transaction'
import { Payment, PaymentStatus } from './Payment'
import { transformerDecimalToNumber } from 'src/utils/entity-transform'
import { Exclude, Expose } from 'class-transformer'
import { sumBy } from 'lodash'

export enum UserSignInType {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
  EMAIL = 'e-mail',
}

@Entity({ name: 'users' })
@Index(['email'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
export class User extends AppEntity {
  @Column({ name: 'name', nullable: false, default: '' })
  name: string

  @Column({ name: 'email', nullable: true })
  email: string

  @Column({ name: 'last_sign_in_at', type: 'timestamp', nullable: true })
  lastSignInAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  @Column({ name: 'password', nullable: true, select: false })
  password: string

  @Column({
    name: 'balance',
    type: 'numeric',
    nullable: true,
    default: 0,
    transformer: transformerDecimalToNumber,
  })
  balance: number

  @Column({
    name: 'role',
    type: 'enum',
    nullable: false,
    enum: Role,
    default: Role.USER,
  })
  role: Role

  @ManyToMany(
    () => Transaction,
    transactions => transactions.users,
  )
  transactions: Transaction[]
  // @RelationId((user: User) => user.transactions)
  // transactionIds: string[]

  @OneToMany(
    () => Payment,
    payments => payments.user,
  )
  payments: Payment[]
  @RelationId((user: User) => user.payments)
  paymentIds: string[]

  async updateBalance(etm: EntityManager) {
    const userId = this.id
    const payments = await etm.find(Payment, {
      where: {
        userId,
        status: PaymentStatus.PENDING,
      },
      relations: ['transaction'],
    })
    const sumPayments = sumBy(payments, ({ price }) => price)
    this.balance = -sumPayments
    return await etm.save(this)
  }
}
