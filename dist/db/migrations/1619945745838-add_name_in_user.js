"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNameInUser1619945745838 = void 0;
class addNameInUser1619945745838 {
    constructor() {
        this.name = 'addNameInUser1619945745838';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobile_no"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname_th"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname_th"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "ref" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resources" ALTER COLUMN "ref" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "ref" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "ref" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resources" ALTER COLUMN "ref" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "ref" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthdate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname_th" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname_th" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "mobile_no" character varying`);
    }
}
exports.addNameInUser1619945745838 = addNameInUser1619945745838;
//# sourceMappingURL=1619945745838-add_name_in_user.js.map