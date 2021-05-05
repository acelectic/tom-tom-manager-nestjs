import { MigrationInterface, QueryRunner } from 'typeorm'

export class addNameInUser1619945745838 implements MigrationInterface {
  name = 'addNameInUser1619945745838'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobile_no"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname_th"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname_th"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthdate"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL DEFAULT ''`)
    await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "ref" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "resources" ALTER COLUMN "ref" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "ref" DROP NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "ref" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "resources" ALTER COLUMN "ref" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "ref" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying`)
    await queryRunner.query(`ALTER TABLE "users" ADD "birthdate" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "users" ADD "lastname_th" character varying`)
    await queryRunner.query(`ALTER TABLE "users" ADD "firstname_th" character varying`)
    await queryRunner.query(`ALTER TABLE "users" ADD "mobile_no" character varying`)
  }
}
