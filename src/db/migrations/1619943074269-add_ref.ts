import { MigrationInterface, QueryRunner } from 'typeorm'

export class addRef1619943074269 implements MigrationInterface {
  name = 'addRef1619943074269'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" ADD "ref" SERIAL`)
    await queryRunner.query(`ALTER TABLE "resources" ADD "ref" SERIAL`)
    await queryRunner.query(`ALTER TABLE "payments" ADD "ref" SERIAL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "ref"`)
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "ref"`)
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "ref"`)
  }
}
