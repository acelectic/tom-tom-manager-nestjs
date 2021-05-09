import {
  BaseEntity,
  FindConditions,
  ObjectType,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

export abstract class AppEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date

  static async findOrInit<T extends AppEntity>(
    this: ObjectType<T>,
    data: FindConditions<T>,
  ): Promise<T> {
    let record = await (this as any).findOne(data)
    if (!record) {
      record = (this as any).create(data)
    }
    return record
  }
}
