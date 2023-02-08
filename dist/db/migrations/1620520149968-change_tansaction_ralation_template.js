"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTansactionRalationTemplate1620520149968 = void 0;
class changeTansactionRalationTemplate1620520149968 {
    constructor() {
        this.name = 'changeTansactionRalationTemplate1620520149968';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "templateId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_5b66ca377626eab7063be93ac6f" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_5b66ca377626eab7063be93ac6f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "templateId"`);
    }
}
exports.changeTansactionRalationTemplate1620520149968 = changeTansactionRalationTemplate1620520149968;
//# sourceMappingURL=1620520149968-change_tansaction_ralation_template.js.map