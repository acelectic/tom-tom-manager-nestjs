import {MigrationInterface, QueryRunner} from "typeorm";

export class addTemplate1620265781436 implements MigrationInterface {
    name = 'addTemplate1620265781436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "ref" SERIAL, "is_active" boolean DEFAULT false, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "templates_resources" ("templateId" uuid NOT NULL, "resourceId" uuid NOT NULL, CONSTRAINT "PK_9afd15e23dbaedfeb6ad8216ee0" PRIMARY KEY ("templateId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e2a521e49325cda0378e04ac2" ON "templates_resources" ("templateId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0eaa6cf0c86abec97e4b772f96" ON "templates_resources" ("resourceId") `);
        await queryRunner.query(`ALTER TABLE "templates_resources" ADD CONSTRAINT "FK_7e2a521e49325cda0378e04ac2f" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "templates_resources" ADD CONSTRAINT "FK_0eaa6cf0c86abec97e4b772f964" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates_resources" DROP CONSTRAINT "FK_0eaa6cf0c86abec97e4b772f964"`);
        await queryRunner.query(`ALTER TABLE "templates_resources" DROP CONSTRAINT "FK_7e2a521e49325cda0378e04ac2f"`);
        await queryRunner.query(`DROP INDEX "IDX_0eaa6cf0c86abec97e4b772f96"`);
        await queryRunner.query(`DROP INDEX "IDX_7e2a521e49325cda0378e04ac2"`);
        await queryRunner.query(`DROP TABLE "templates_resources"`);
        await queryRunner.query(`DROP TABLE "templates"`);
    }

}
