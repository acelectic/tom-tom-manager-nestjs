"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addColumnTrMeta1675647168610 = void 0;
class addColumnTrMeta1675647168610 {
    constructor() {
        this.name = 'addColumnTrMeta1675647168610';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "meta" jsonb DEFAULT '{}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "meta"`);
    }
}
exports.addColumnTrMeta1675647168610 = addColumnTrMeta1675647168610;
//# sourceMappingURL=1675647168610-add-column-tr-meta.js.map