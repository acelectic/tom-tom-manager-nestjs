import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTansactionRalationTemplate1620520149968 implements MigrationInterface {
    name = 'changeTansactionRalationTemplate1620520149968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "templateId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_5b66ca377626eab7063be93ac6f" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_5b66ca377626eab7063be93ac6f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "templateId"`);
    }

}
