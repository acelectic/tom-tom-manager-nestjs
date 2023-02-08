"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTz1619934556749 = void 0;
class changeTz1619934556749 {
    constructor() {
        this.name = 'changeTz1619934556749';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }
}
exports.changeTz1619934556749 = changeTz1619934556749;
//# sourceMappingURL=1619934556749-change_tz.js.map