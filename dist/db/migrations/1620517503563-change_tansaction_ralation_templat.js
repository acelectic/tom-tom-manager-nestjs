"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTansactionRalationTemplat1620517503563 = void 0;
class changeTansactionRalationTemplat1620517503563 {
    constructor() {
        this.name = 'changeTansactionRalationTemplat1620517503563';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "templates" ALTER COLUMN "ref" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "templates" ALTER COLUMN "ref" SET NOT NULL`);
    }
}
exports.changeTansactionRalationTemplat1620517503563 = changeTansactionRalationTemplat1620517503563;
//# sourceMappingURL=1620517503563-change_tansaction_ralation_templat.js.map