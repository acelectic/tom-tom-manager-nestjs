"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRemianInTransaction1619940692077 = void 0;
class addRemianInTransaction1619940692077 {
    constructor() {
        this.name = 'addRemianInTransaction1619940692077';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "remain" numeric NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "remain"`);
    }
}
exports.addRemianInTransaction1619940692077 = addRemianInTransaction1619940692077;
//# sourceMappingURL=1619940692077-add_remian_in_transaction.js.map