import { MigrationInterface, QueryRunner } from 'typeorm'

export class changeTz1619934556749 implements MigrationInterface {
  name = 'changeTz1619934556749'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "transactions" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`)
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "resources" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "resources" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "resources" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`)
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "payments" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "payments" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "resources" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "resources" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "resources" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "transactions" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`)
  }
}
