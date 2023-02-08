"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAfterInsertPaymentToUpdateTransactionComplated1619940295899 = void 0;
class addAfterInsertPaymentToUpdateTransactionComplated1619940295899 {
    constructor() {
        this.name = 'addAfterInsertPaymentToUpdateTransactionComplated1619940295899';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "completed" boolean DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "completed"`);
    }
}
exports.addAfterInsertPaymentToUpdateTransactionComplated1619940295899 = addAfterInsertPaymentToUpdateTransactionComplated1619940295899;
//# sourceMappingURL=1619940295899-add_after_insert_payment_to_update_transaction_complated.js.map