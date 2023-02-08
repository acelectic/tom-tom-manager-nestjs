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
exports.ConfirmUserAllPaymentParamsDto = exports.ConfirmPaymentParamsDto = exports.CreatePaymentParamsDto = exports.GetPaymentsParamsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const Payment_1 = require("../../../db/entities/Payment");
const base_dto_1 = require("../../dto/base.dto");
class GetPaymentsParamsDto extends base_dto_1.BasePaginateParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], GetPaymentsParamsDto.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], GetPaymentsParamsDto.prototype, "transactionId", void 0);
exports.GetPaymentsParamsDto = GetPaymentsParamsDto;
class CreatePaymentParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.Min(0),
    class_validator_1.Max(30000),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreatePaymentParamsDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID('all'),
    __metadata("design:type", String)
], CreatePaymentParamsDto.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(Payment_1.PaymentType, {
        each: true,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePaymentParamsDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID('all'),
    class_validator_1.ValidateIf(o => o.type === Payment_1.PaymentType.BUY),
    __metadata("design:type", String)
], CreatePaymentParamsDto.prototype, "resourceId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID('all'),
    class_validator_1.ValidateIf(o => o.type === Payment_1.PaymentType.PAID),
    __metadata("design:type", String)
], CreatePaymentParamsDto.prototype, "transactionId", void 0);
exports.CreatePaymentParamsDto = CreatePaymentParamsDto;
class ConfirmPaymentParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], ConfirmPaymentParamsDto.prototype, "paymentId", void 0);
exports.ConfirmPaymentParamsDto = ConfirmPaymentParamsDto;
class ConfirmUserAllPaymentParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], ConfirmUserAllPaymentParamsDto.prototype, "userId", void 0);
exports.ConfirmUserAllPaymentParamsDto = ConfirmUserAllPaymentParamsDto;
//# sourceMappingURL=payment-params.dto.js.map