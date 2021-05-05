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
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { Role } from '../../modules/auth/auth.constant'
import { Transaction } from './Transaction'
import { Payment } from './Payment'
import { transformerDecimalToNumber } from 'src/utils/entity-transform'
import { Exclude, Expose } from 'class-transformer'

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
  @JoinTable({
    name: 'users_transactions',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'transactionId',
      referencedColumnName: 'id',
    },
  })
  transactions: Transaction[]

  @OneToMany(
    () => Payment,
    payments => payments.transaction,
  )
  payments: Payment[]
}
