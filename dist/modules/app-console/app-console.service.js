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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConsoleService = void 0;
const nestjs_console_1 = require("nestjs-console");
require('dayjs/locale/es');
const dayjs_1 = __importDefault(require("dayjs"));
const test_helper_1 = require("../../utils/test-helper");
const User_1 = require("../../db/entities/User");
const lodash_1 = require("lodash");
const chance_1 = require("chance");
const transaction_service_1 = require("../transaction/transaction.service");
const typeorm_1 = require("typeorm");
const helper_1 = require("../../utils/helper");
const payment_service_1 = require("../payment/payment.service");
const Template_1 = require("../../db/entities/Template");
const bcrypt_1 = require("bcrypt");
let AppConsoleService = class AppConsoleService {
    constructor(transactionService, paymentService) {
        this.transactionService = transactionService;
        this.paymentService = paymentService;
    }
    async testCosole() {
        const now = (0, dayjs_1.default)();
        console.log(now);
    }
    async truncates() {
        await (0, test_helper_1.truncates)('transactions', 'users', 'payments', 'resources');
    }
    async mockTransactions() {
        const connection = (0, typeorm_1.getConnection)();
        const users = await User_1.User.find();
        const templates = await Template_1.Template.find({
            where: {
                isActive: true,
            },
        });
        for (const i in (0, lodash_1.range)((0, chance_1.Chance)().integer({
            min: 15,
            max: 20,
        }))) {
            const etm = connection.createEntityManager();
            const usersSize = (0, chance_1.Chance)().integer({ min: 1, max: users.length });
            const userSample = (0, lodash_1.sampleSize)(users, usersSize);
            const userIds = userSample.map(d => d.id);
            const template = (0, lodash_1.sample)(templates);
            const { transaction } = await this.transactionService.createTransaction({
                userIds,
                templateId: template.id,
            }, etm);
            const dateRandom = (0, chance_1.Chance)().integer({ max: 5, min: 1 });
            transaction.createdAt = (0, dayjs_1.default)()
                .tz()
                .subtract(dateRandom, 'day')
                .toDate();
            (0, helper_1.debugLog)({ transaction });
            await etm.save(transaction);
        }
    }
    async mockPayments() {
        const connection = (0, typeorm_1.getConnection)();
        const etm = connection.createEntityManager();
        const password = '123456';
        const encryptPassword = await (0, bcrypt_1.hash)(password, 10);
        for (const i in (0, lodash_1.range)((0, chance_1.Chance)().integer({
            min: 5,
            max: 30,
        }))) {
            const name = (0, chance_1.Chance)().name({ middle: true, middle_initial: true });
            const email = (0, chance_1.Chance)().email({
                domain: 'test.com',
                length: 10,
            });
            const user = await User_1.User.findOrInit({
                email,
                name,
            });
            user.password = encryptPassword;
            await etm.save(user);
        }
    }
};
__decorate([
    (0, nestjs_console_1.Command)({
        command: 'test-cosole',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppConsoleService.prototype, "testCosole", null);
__decorate([
    (0, nestjs_console_1.Command)({
        command: 'truncates',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppConsoleService.prototype, "truncates", null);
__decorate([
    (0, nestjs_console_1.Command)({
        command: 'mock-transactions',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppConsoleService.prototype, "mockTransactions", null);
__decorate([
    (0, nestjs_console_1.Command)({
        command: 'mock-users',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppConsoleService.prototype, "mockPayments", null);
AppConsoleService = __decorate([
    (0, nestjs_console_1.Console)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        payment_service_1.PaymentService])
], AppConsoleService);
exports.AppConsoleService = AppConsoleService;
//# sourceMappingURL=app-console.service.js.map