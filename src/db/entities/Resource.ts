import { unionBy } from 'lodash'
import { transformerDecimalToNumber } from 'src/utils/entity-transform'
import {
  Column,
  Entity,
  DeleteDateColumn,
  Index,
  FindConditions,
  ObjectType,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Generated,
  RelationId,
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { Payment } from './Payment'
import { Template } from './Template'
import { Transaction } from './Transaction'

@Entity({ name: 'resources' })
export class Resource extends AppEntity {
  @Column({ name: 'name', nullable: false })
  name: string

  @Column({
    name: 'price',
    type: 'numeric',
    default: 0,
    nullable: false,
    transformer: transformerDecimalToNumber,
  })
  price: number

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: true })
  isActive: boolean

  @Generated('rowid')
  @Column({
    name: 'ref',
    nullable: true,
  })
  ref: string

  @OneToMany(
    () => Payment,
    payments => payments.transaction,
  )
  payments: Payment[]

  @ManyToMany(
    () => Transaction,
    transactions => transactions.resources,
  )
  @JoinTable({
    name: 'resources_transactions',
    joinColumn: {
      name: 'resourceId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'transactionId',
      referencedColumnName: 'id',
    },
  })
  transactions: Transaction[]

  @ManyToMany(
    () => Template,
    templates => templates.resources,
    {
      lazy: true,
    },
  )
  templates: Template[]

  @RelationId((resource: Resource) => resource.templates)
  resourceIds: string[]

  // async addTemplateRelation(templates: Template[]) {
  //   const curTemplates = this.templates || []
  //   const newTemplates = unionBy(curTemplates.concat(templates), id => id)
  //   this.templates = newTemplates
  //   await this.save({
  //     transaction: true,
  //   })
  // }
}
