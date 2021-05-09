import { MigrationInterface, QueryRunner } from 'typeorm'

export class addRemianInTransaction1619940692077 implements MigrationInterface {
  name = 'addRemianInTransaction1619940692077'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" ADD "remain" numeric NOT NULL DEFAULT '0'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "remain"`)
  }
}
