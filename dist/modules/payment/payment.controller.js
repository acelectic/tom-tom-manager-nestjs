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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/auth.decorator");
const swagger_1 = require("@nestjs/swagger");
const payment_service_1 = require("./payment.service");
const payment_params_dto_1 = require("./dto/payment-params.dto");
const typeorm_1 = require("typeorm");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async getPayments(query) {
        return this.paymentService.getPayments(query);
    }
    async createTransactions(body, etm) {
        return this.paymentService.createPayment(body, etm);
    }
    async confirmPayment(params, etm) {
        return this.paymentService.confirmPayment(params, etm);
    }
    async confirmUserAllPayments(bodyParams, etm) {
        return this.paymentService.confirmUserAllPayments(bodyParams, etm);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_params_dto_1.GetPaymentsParamsDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPayments", null);
__decorate([
    common_1.Post(),
    typeorm_1.Transaction(),
    __param(0, common_1.Body()),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_params_dto_1.CreatePaymentParamsDto,
        typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createTransactions", null);
__decorate([
    common_1.Post(':paymentId/confirm'),
    typeorm_1.Transaction(),
    __param(0, common_1.Param()),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_params_dto_1.ConfirmPaymentParamsDto,
        typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "confirmPayment", null);
__decorate([
    common_1.Post('/confirm-all'),
    typeorm_1.Transaction(),
    __param(0, common_1.Body()),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_params_dto_1.ConfirmUserAllPaymentParamsDto,
        typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "confirmUserAllPayments", null);
PaymentController = __decorate([
    swagger_1.ApiTags('payments'),
    common_1.Controller('v1/payments'),
    auth_decorator_1.Auth(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map