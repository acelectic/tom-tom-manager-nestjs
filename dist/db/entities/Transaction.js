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
exports.Transaction = void 0;
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
const entity_transform_1 = require("../../utils/entity-transform");
const typeorm_1 = require("typeorm");
const AppEntity_1 = require("./AppEntity");
const Payment_1 = require("./Payment");
const Template_1 = require("./Template");
const User_1 = require("./User");
let Transaction = class Transaction extends AppEntity_1.AppEntity {
    async updateRemain(etm) {
        const transactionId = this.id;
        const paymentsWaitPaid = await etm.find(Payment_1.Payment, {
            where: {
                transactionId,
                status: Payment_1.PaymentStatus.PENDING,
            },
        });
        const totalWaitPaided = (0, lodash_1.sumBy)(paymentsWaitPaid, payment => Number(payment.price));
        const remain = totalWaitPaided;
        this.remain = Math.max(0, remain);
        if (remain <= 0)
            this.completed = true;
        await etm.save(this);
    }
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'price',
        type: 'numeric',
        nullable: false,
        transformer: entity_transform_1.transformerDecimalToNumber,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'remain',
        type: 'numeric',
        nullable: false,
        default: 0,
        transformer: entity_transform_1.transformerDecimalToNumber,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "remain", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detail', nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed', type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Transaction.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Generated)('rowid'),
    (0, typeorm_1.Column)({
        name: 'ref',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => `${value}`.padStart(6, '0')),
    __metadata("design:type", String)
], Transaction.prototype, "ref", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, users => users.transactions),
    (0, typeorm_1.JoinTable)({
        name: 'users_transactions',
        joinColumn: {
            name: 'transactionId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Transaction.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Payment_1.Payment, payments => payments.transaction, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Transaction.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Template_1.Template, template => template.transactions, {
        lazy: true,
        nullable: true,
    }),
    __metadata("design:type", Template_1.Template)
], Transaction.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.RelationId)((transaction) => transaction.template),
    __metadata("design:type", String)
], Transaction.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'meta',
        nullable: true,
        type: 'jsonb',
        default: {},
    }),
    __metadata("design:type", Object)
], Transaction.prototype, "meta", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)({ name: 'transactions' })
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map