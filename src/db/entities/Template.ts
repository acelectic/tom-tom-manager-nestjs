import { Transform } from 'class-transformer'
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
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { Payment } from './Payment'
import { Resource } from './Resource'
import { User } from './User'

@Entity({ name: 'templates' })
export class Template extends AppEntity {
  @Generated('rowid')
  @Column({
    name: 'ref',
    nullable: true,
  })
  @Transform(({ value }) => `${value}`.padStart(5))
  ref: string

  @Column({ name: 'is_active', type: 'boolean', default: false, nullable: true })
  isActive: boolean

  @ManyToMany(
    () => Resource,
    resources => resources.templates,
    {
      nullable: true,
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
}
