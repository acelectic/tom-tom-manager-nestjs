"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRelationColumnPayment1619939356474 = void 0;
class addRelationColumnPayment1619939356474 {
    constructor() {
        this.name = 'addRelationColumnPayment1619939356474';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_05620397b68fb3282adf8f25217"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_c39d78e8744809ece8ca95730e2"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "resourceId"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "resource_id" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transaction_id" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_dd018bf12e944e43279eb74ebb0" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_dd018bf12e944e43279eb74ebb0"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_3c324ca49dabde7ffc0ef64675d"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "resource_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "resourceId" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_c39d78e8744809ece8ca95730e2" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_05620397b68fb3282adf8f25217" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.addRelationColumnPayment1619939356474 = addRelationColumnPayment1619939356474;
//# sourceMappingURL=1619939356474-add_relation_column_payment.js.map