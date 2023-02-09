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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const Payment_1 = require("../../db/entities/Payment");
const Template_1 = require("../../db/entities/Template");
const Transaction_1 = require("../../db/entities/Transaction");
const User_1 = require("../../db/entities/User");
const response_error_1 = require("../../utils/response-error");
const typeorm_1 = require("typeorm");
const payment_service_1 = require("../payment/payment.service");
let TransactionService = class TransactionService {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async getTransactions(params) {
        const { userId, page = 1, limit = 5 } = params;
        if (userId) {
            const { transactions: userTransactions } = await User_1.User.findOne({
                where: {
                    id: userId,
                },
                relations: ['transactions'],
            });
            const transactionIds = userTransactions.map(({ id }) => id);
            const queryBuilder = Transaction_1.Transaction.createQueryBuilder('transaction')
                .leftJoinAndSelect('transaction.users', 'users')
                .orderBy('transaction.completed', 'ASC')
                .addOrderBy('transaction.createdAt', 'ASC')
                .where('transaction.id in (:...transactionIds)', { transactionIds });
            const transactions = await (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
            return transactions;
        }
        const queryBuilder = Transaction_1.Transaction.createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.users', 'users')
            .orderBy('transaction.completed', 'ASC')
            .addOrderBy('transaction.createdAt', 'ASC');
        const transactions = await (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
        return transactions;
    }
    async getTransactionsHistory(parmas) {
        const { userId, status, endDate, startDate = (0, dayjs_1.default)().subtract(30, 'day') } = parmas;
        const queryBuilder = Transaction_1.Transaction.createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.users', 'users')
            .orderBy('transaction.completed', 'ASC')
            .addOrderBy('transaction.createdAt', 'DESC');
        if (startDate) {
            queryBuilder.andWhere('transaction.created_at > :startDate', {
                startDate: (0, dayjs_1.default)(startDate)
                    .tz()
                    .toISOString(),
            });
        }
        if (endDate) {
            queryBuilder.andWhere('transaction.created_at < :endDate', {
                endDate: (0, dayjs_1.default)(endDate)
                    .tz()
                    .toISOString(),
            });
        }
        if (userId) {
            queryBuilder.andWhere('transaction.user_id = :userId', {
                userId,
            });
        }
        if ((0, lodash_1.isBoolean)(status)) {
            queryBuilder.andWhere('transaction.completed = :status', {
                status,
            });
        }
        const transactions = await queryBuilder.getMany();
        return { transactions };
    }
    async getTransaction(transactionId) {
        const transaction = await Transaction_1.Transaction.createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.users', 'users')
            .leftJoinAndSelect('transaction.payments', 'payments')
            .leftJoinAndSelect('transaction.template', 'template')
            .where('transaction.id = :transactionId', { transactionId })
            .getOne();
        return transaction;
    }
    async createTransaction(params, etm) {
        const { userIds, templateId } = params;
        const users = await User_1.User.findBy({
            id: (0, typeorm_1.In)(userIds),
        });
        const template = await Template_1.Template.findOneBy({
            id: templateId,
        });
        const resources = await template.resources;
        if (!users.length) {
            (0, response_error_1.validateError)('Users must least one');
        }
        if (!resources.length) {
            (0, response_error_1.validateError)('Resources must least one');
        }
        const price = (0, lodash_1.sumBy)(resources, ({ price }) => Number(price));
        const transaction = await Transaction_1.Transaction.create({
            price,
            remain: price,
            users,
            template,
            meta: {
                resources,
            },
        });
        await etm.save(transaction);
        const paymentPrice = (0, lodash_1.ceil)(price / users.length, 0);
        const payments = await users.map(async (user) => {
            const { id: userId } = user;
            const params = {
                price: paymentPrice,
                type: Payment_1.PaymentType.PAID,
                transactionId: transaction.id,
                userId: userId,
            };
            const payment = await this.paymentService.createPayment(params, etm);
            await user.updateBalance(etm);
            return payment;
        });
        await Promise.all(payments);
        return { transaction, payments };
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map