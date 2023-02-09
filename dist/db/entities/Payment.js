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
exports.Payment = exports.PaymentType = exports.PaymentStatus = void 0;
const class_transformer_1 = require("class-transformer");
const entity_transform_1 = require("../../utils/entity-transform");
const typeorm_1 = require("typeorm");
const AppEntity_1 = require("./AppEntity");
const Resource_1 = require("./Resource");
const Transaction_1 = require("./Transaction");
const User_1 = require("./User");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["SETTLED"] = "settled";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["BUY"] = "buy";
    PaymentType["PAID"] = "paid";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
let Payment = class Payment extends AppEntity_1.AppEntity {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'price',
        type: 'numeric',
        nullable: false,
        transformer: entity_transform_1.transformerDecimalToNumber,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'enum',
        enum: PaymentType,
        nullable: false,
    }),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
        type: 'uuid',
        nullable: false,
    }),
    __metadata("design:type", String)
], Payment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
        nullable: true,
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'resource_id',
        type: 'uuid',
        nullable: true,
    }),
    __metadata("design:type", String)
], Payment.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'transaction_id',
        type: 'uuid',
        nullable: true,
    }),
    __metadata("design:type", String)
], Payment.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Generated)('rowid'),
    (0, typeorm_1.Column)({
        name: 'ref',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => `${value}`.padStart(6, '0')),
    __metadata("design:type", String)
], Payment.prototype, "ref", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.payments),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], Payment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Transaction_1.Transaction, transaction => transaction.payments, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'transaction_id', referencedColumnName: 'id' }),
    __metadata("design:type", Transaction_1.Transaction)
], Payment.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Resource_1.Resource, resource => resource.payments, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'resource_id', referencedColumnName: 'id' }),
    __metadata("design:type", Resource_1.Resource)
], Payment.prototype, "resource", void 0);
Payment = __decorate([
    (0, typeorm_1.Entity)({ name: 'payments' })
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=Payment.js.map