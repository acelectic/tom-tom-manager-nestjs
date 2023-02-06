import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnTemplate1675654897158 implements MigrationInterface {
    name = 'addColumnTemplate1675654897158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" ADD "name" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "description" text DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "name"`);
    }

}
