import {
  BaseEntity,
  ObjectType,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  FindOptionsWhere,
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
    data: FindOptionsWhere<T>,
  ): Promise<T> {
    let record = await (this as any).findOneBy(data)
    if (!record) {
      record = (this as any).create(data)
    }
    return record
  }
}
