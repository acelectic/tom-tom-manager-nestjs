import { MigrationInterface, QueryRunner } from 'typeorm'

export class addPaymentType1619938372783 implements MigrationInterface {
  name = 'addPaymentType1619938372783'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "payments_type_enum" AS ENUM('buy', 'paid')`)
    await queryRunner.query(`ALTER TABLE "payments" ADD "type" "payments_type_enum" NOT NULL`)
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b383987bfa6e6a8745085621d0" ON "users" ("email") WHERE deleted_at IS NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_b383987bfa6e6a8745085621d0"`)
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "type"`)
    await queryRunner.query(`DROP TYPE "payments_type_enum"`)
  }
}
