import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTansactionRalationTemplat1620517503563 implements MigrationInterface {
    name = 'changeTansactionRalationTemplat1620517503563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" ALTER COLUMN "ref" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" ALTER COLUMN "ref" SET NOT NULL`);
    }

}
