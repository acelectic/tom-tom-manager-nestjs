import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnTrMeta1675647168610 implements MigrationInterface {
    name = 'addColumnTrMeta1675647168610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "meta" jsonb DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "meta"`);
    }

}
