"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRef1619943074269 = void 0;
class addRef1619943074269 {
    constructor() {
        this.name = 'addRef1619943074269';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "ref" SERIAL`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "ref" SERIAL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "ref" SERIAL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "ref"`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "ref"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "ref"`);
    }
}
exports.addRef1619943074269 = addRef1619943074269;
//# sourceMappingURL=1619943074269-add_ref.js.map