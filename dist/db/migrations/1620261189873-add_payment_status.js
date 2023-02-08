"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaymentStatus1620261189873 = void 0;
class addPaymentStatus1620261189873 {
    constructor() {
        this.name = 'addPaymentStatus1620261189873';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "payments_status_enum" AS ENUM('pending', 'failed', 'settled')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "status" "payments_status_enum" DEFAULT 'pending'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "payments_status_enum"`);
    }
}
exports.addPaymentStatus1620261189873 = addPaymentStatus1620261189873;
//# sourceMappingURL=1620261189873-add_payment_status.js.map