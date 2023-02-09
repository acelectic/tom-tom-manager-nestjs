"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addColumnTemplate1675654897158 = void 0;
class addColumnTemplate1675654897158 {
    constructor() {
        this.name = 'addColumnTemplate1675654897158';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "templates" ADD "name" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "description" text DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "name"`);
    }
}
exports.addColumnTemplate1675654897158 = addColumnTemplate1675654897158;
//# sourceMappingURL=1675654897158-add-column-template.js.map