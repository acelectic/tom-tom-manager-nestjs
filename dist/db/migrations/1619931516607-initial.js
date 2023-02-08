"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial1619931516607 = void 0;
class initial1619931516607 {
    constructor() {
        this.name = 'initial1619931516607';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'manager', 'user', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "mobile_no" character varying, "firstname_th" character varying, "lastname_th" character varying, "birthdate" TIMESTAMP, "gender" character varying, "email" character varying, "last_sign_in_at" TIMESTAMP, "password" character varying, "role" "users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b383987bfa6e6a8745085621d0" ON "users" ("email") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "price" numeric NOT NULL, "detail" character varying, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resources" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "price" numeric NOT NULL DEFAULT '0', "is_active" boolean DEFAULT true, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "price" numeric NOT NULL, "userId" uuid, "transactionId" uuid, "resourceId" uuid, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_transactions" ("userId" uuid NOT NULL, "transactionId" uuid NOT NULL, CONSTRAINT "PK_c9d6ee257d7f55f157deb7c0767" PRIMARY KEY ("userId", "transactionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9028eba0e23351bb7f6d6c3730" ON "users_transactions" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f8c585a84ea6998331e0e320c" ON "users_transactions" ("transactionId") `);
        await queryRunner.query(`CREATE TABLE "resources_transactions" ("transactionId" uuid NOT NULL, "resourceId" uuid NOT NULL, CONSTRAINT "PK_6e2e4998d64d6fdb4385a2b2741" PRIMARY KEY ("transactionId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c96ae12515c7097bee7faf0ef2" ON "resources_transactions" ("transactionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_42e67d39b8a362e9d3263f4d4b" ON "resources_transactions" ("resourceId") `);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_c39d78e8744809ece8ca95730e2" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_05620397b68fb3282adf8f25217" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_9028eba0e23351bb7f6d6c37305" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_9f8c585a84ea6998331e0e320c7" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resources_transactions" ADD CONSTRAINT "FK_c96ae12515c7097bee7faf0ef21" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resources_transactions" ADD CONSTRAINT "FK_42e67d39b8a362e9d3263f4d4b2" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "resources_transactions" DROP CONSTRAINT "FK_42e67d39b8a362e9d3263f4d4b2"`);
        await queryRunner.query(`ALTER TABLE "resources_transactions" DROP CONSTRAINT "FK_c96ae12515c7097bee7faf0ef21"`);
        await queryRunner.query(`ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_9f8c585a84ea6998331e0e320c7"`);
        await queryRunner.query(`ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_9028eba0e23351bb7f6d6c37305"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_05620397b68fb3282adf8f25217"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_c39d78e8744809ece8ca95730e2"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`DROP INDEX "IDX_42e67d39b8a362e9d3263f4d4b"`);
        await queryRunner.query(`DROP INDEX "IDX_c96ae12515c7097bee7faf0ef2"`);
        await queryRunner.query(`DROP TABLE "resources_transactions"`);
        await queryRunner.query(`DROP INDEX "IDX_9f8c585a84ea6998331e0e320c"`);
        await queryRunner.query(`DROP INDEX "IDX_9028eba0e23351bb7f6d6c3730"`);
        await queryRunner.query(`DROP TABLE "users_transactions"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "resources"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP INDEX "IDX_b383987bfa6e6a8745085621d0"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.initial1619931516607 = initial1619931516607;
//# sourceMappingURL=1619931516607-initial.js.map