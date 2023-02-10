import { MigrationInterface, QueryRunner } from 'typeorm'

export class addRefreshToken1676058154404 implements MigrationInterface {
  name = 'addRefreshToken1676058154404'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates_resources" DROP CONSTRAINT "FK_7e2a521e49325cda0378e04ac2f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates_resources" DROP CONSTRAINT "FK_0eaa6cf0c86abec97e4b772f964"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_9028eba0e23351bb7f6d6c37305"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_9f8c585a84ea6998331e0e320c7"`,
    )
    await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`)
    await queryRunner.query(
      `ALTER TABLE "templates_resources" ADD CONSTRAINT "FK_7e2a521e49325cda0378e04ac2f" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates_resources" ADD CONSTRAINT "FK_0eaa6cf0c86abec97e4b772f964" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_9f8c585a84ea6998331e0e320c7" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_9028eba0e23351bb7f6d6c37305" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_9028eba0e23351bb7f6d6c37305"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_9f8c585a84ea6998331e0e320c7"`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates_resources" DROP CONSTRAINT "FK_0eaa6cf0c86abec97e4b772f964"`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates_resources" DROP CONSTRAINT "FK_7e2a521e49325cda0378e04ac2f"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`)
    await queryRunner.query(
      `ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_9f8c585a84ea6998331e0e320c7" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_9028eba0e23351bb7f6d6c37305" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates_resources" ADD CONSTRAINT "FK_0eaa6cf0c86abec97e4b772f964" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates_resources" ADD CONSTRAINT "FK_7e2a521e49325cda0378e04ac2f" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }
}
