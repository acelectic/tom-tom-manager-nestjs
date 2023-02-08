"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaymentType1619938372783 = void 0;
class addPaymentType1619938372783 {
    constructor() {
        this.name = 'addPaymentType1619938372783';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "payments_type_enum" AS ENUM('buy', 'paid')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "type" "payments_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b383987bfa6e6a8745085621d0" ON "users" ("email") WHERE deleted_at IS NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_b383987bfa6e6a8745085621d0"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "payments_type_enum"`);
    }
}
exports.addPaymentType1619938372783 = addPaymentType1619938372783;
//# sourceMappingURL=1619938372783-add_payment_type.js.map