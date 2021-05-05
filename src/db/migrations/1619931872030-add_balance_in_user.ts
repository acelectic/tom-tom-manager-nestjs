import { MigrationInterface, QueryRunner } from 'typeorm'

export class addBalanceInUser1619931872030 implements MigrationInterface {
  name = 'addBalanceInUser1619931872030'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "balance" numeric DEFAULT '0'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`)
  }
}
