import {
  Column,
  Entity,
  DeleteDateColumn,
  Index,
  OneToMany,
  ManyToMany,
  RelationId,
  EntityManager,
  In,
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { Role } from '../../modules/auth/auth.constant'
import { Transaction } from './Transaction'
import { Payment, PaymentStatus, PaymentType } from './Payment'
import { transformerDecimalToNumber } from 'src/utils/entity-transform'
import { Exclude } from 'class-transformer'

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

  @Exclude()
  @Column({ name: 'password', nullable: true })
  password: string

  @Exclude()
  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string

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

  @ManyToMany(() => Transaction, (transactions) => transactions.users)
  transactions: Transaction[]

  @OneToMany(() => Payment, (payments) => payments.user)
  payments: Payment[]

  @Exclude()
  @RelationId((user: User) => user.payments)
  paymentIds: string[]

  async updateBalance(etm: EntityManager) {
    const userId = this.id
    const paymentsPaid = await etm.sum(Payment, 'price', {
      userId,
      type: PaymentType.PAID,
      status: In([PaymentStatus.PENDING]),
    })
    // const paymentsBuy = await etm.sum(Payment, 'price', {
    //   userId,
    //   type: PaymentType.BUY,
    //   status: PaymentStatus.SETTLED,
    // })

    this.balance = paymentsPaid
    await etm.save(this)
    return this
  }
}
