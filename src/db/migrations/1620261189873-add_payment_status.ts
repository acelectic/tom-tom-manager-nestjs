import {MigrationInterface, QueryRunner} from "typeorm";

export class addPaymentStatus1620261189873 implements MigrationInterface {
    name = 'addPaymentStatus1620261189873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "payments_status_enum" AS ENUM('pending', 'failed', 'settled')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "status" "payments_status_enum" DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "payments_status_enum"`);
    }

}
