"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSignInType = void 0;
const typeorm_1 = require("typeorm");
const AppEntity_1 = require("./AppEntity");
const auth_constant_1 = require("../../modules/auth/auth.constant");
const Transaction_1 = require("./Transaction");
const Payment_1 = require("./Payment");
const entity_transform_1 = require("../../utils/entity-transform");
const lodash_1 = require("lodash");
var UserSignInType;
(function (UserSignInType) {
    UserSignInType["GOOGLE"] = "google";
    UserSignInType["FACEBOOK"] = "facebook";
    UserSignInType["APPLE"] = "apple";
    UserSignInType["EMAIL"] = "e-mail";
})(UserSignInType = exports.UserSignInType || (exports.UserSignInType = {}));
let User = class User extends AppEntity_1.AppEntity {
    async updateBalance(etm) {
        const userId = this.id;
        const payments = await etm.find(Payment_1.Payment, {
            where: {
                userId,
                status: Payment_1.PaymentStatus.PENDING,
            },
            relations: ['transaction'],
        });
        const sumPayments = lodash_1.sumBy(payments, ({ price }) => price);
        this.balance = -sumPayments;
        return await etm.save(this);
    }
};
__decorate([
    typeorm_1.Column({ name: 'name', nullable: false, default: '' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'email', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ name: 'last_sign_in_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastSignInAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column({ name: 'password', nullable: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        name: 'balance',
        type: 'numeric',
        nullable: true,
        default: 0,
        transformer: entity_transform_1.transformerDecimalToNumber,
    }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    typeorm_1.Column({
        name: 'role',
        type: 'enum',
        nullable: false,
        enum: auth_constant_1.Role,
        default: auth_constant_1.Role.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Transaction_1.Transaction, transactions => transactions.users),
    __metadata("design:type", Array)
], User.prototype, "transactions", void 0);
__decorate([
    typeorm_1.OneToMany(() => Payment_1.Payment, payments => payments.user),
    __metadata("design:type", Array)
], User.prototype, "payments", void 0);
__decorate([
    typeorm_1.RelationId((user) => user.payments),
    __metadata("design:type", Array)
], User.prototype, "paymentIds", void 0);
User = __decorate([
    typeorm_1.Entity({ name: 'users' }),
    typeorm_1.Index(['email'], {
        unique: true,
        where: 'deleted_at IS NULL',
    })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map