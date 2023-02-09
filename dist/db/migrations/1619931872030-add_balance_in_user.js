"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBalanceInUser1619931872030 = void 0;
class addBalanceInUser1619931872030 {
    constructor() {
        this.name = 'addBalanceInUser1619931872030';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "balance" numeric DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`);
    }
}
exports.addBalanceInUser1619931872030 = addBalanceInUser1619931872030;
//# sourceMappingURL=1619931872030-add_balance_in_user.js.map