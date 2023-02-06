import { Transform } from 'class-transformer'
import { Column, Entity, OneToMany, ManyToMany, JoinTable, Generated, RelationId } from 'typeorm'
import { AppEntity } from './AppEntity'
import { Resource } from './Resource'
import { Transaction } from './Transaction'

@Entity({ name: 'templates' })
export class Template extends AppEntity {
  @Generated('rowid')
  @Column({
    name: 'ref',
    nullable: true,
  })
  @Transform(({ value }) => `${value}`.padStart(6))
  ref: string

  @Column({ name: 'name', type: 'text', nullable: false, default: '' })
  name: string

  @Column({ name: 'description', type: 'text', nullable: true, default: '' })
  description: string

  @Column({ name: 'is_active', type: 'boolean', default: false, nullable: true })
  isActive: boolean

  @OneToMany(
    () => Transaction,
    transaction => transaction.template,
    {
      lazy: true,
      nullable: true,
    },
  )
  transactions: Transaction[]
  @RelationId((template: Template) => template.transactions)
  transactionIds: string[]

  @ManyToMany(
    () => Resource,
    resources => resources.templates,
    {
      // cascade: true,
      lazy: true,
    },
  )
  @JoinTable({
    name: 'templates_resources',
    joinColumn: {
      name: 'templateId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'resourceId',
      referencedColumnName: 'id',
    },
  })
  resources: Resource[]

  @RelationId((template: Template) => template.resources)
  resourceIds: string[]
}
