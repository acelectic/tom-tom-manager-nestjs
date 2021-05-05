import { MigrationInterface, QueryRunner } from 'typeorm'

export class addAfterInsertPaymentToUpdateTransactionComplated1619940295899
  implements MigrationInterface {
  name = 'addAfterInsertPaymentToUpdateTransactionComplated1619940295899'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" ADD "completed" boolean DEFAULT false`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "completed"`)
  }
}
