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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/auth.decorator");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const transaction_service_1 = require("./transaction.service");
const transaction_params_dto_1 = require("./dto/transaction-params.dto");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async getTransactions(params) {
        return this.transactionService.getTransactions(params);
    }
    async getTransactionsHistory(queryParams) {
        return this.transactionService.getTransactionsHistory(queryParams);
    }
    async getTransaction(transactionId) {
        return this.transactionService.getTransaction(transactionId);
    }
    async createTransactions(body, etm) {
        return this.transactionService.createTransaction(body, etm);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_params_dto_1.GetTransactionParamsDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactions", null);
__decorate([
    common_1.Get('history'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_params_dto_1.GetTransactionHistoryParamsDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionsHistory", null);
__decorate([
    common_1.Get(':transactionId'),
    __param(0, common_1.Param('transactionId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransaction", null);
__decorate([
    common_1.Post(),
    typeorm_1.Transaction(),
    __param(0, common_1.Body()),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_params_dto_1.CreateTransactionParamsDto,
        typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "createTransactions", null);
TransactionController = __decorate([
    swagger_1.ApiTags('transactions'),
    common_1.Controller('v1/transactions'),
    auth_decorator_1.Auth(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map