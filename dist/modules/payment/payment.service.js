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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const Payment_1 = require("../../db/entities/Payment");
const Resource_1 = require("../../db/entities/Resource");
const Transaction_1 = require("../../db/entities/Transaction");
const User_1 = require("../../db/entities/User");
const response_error_1 = require("../../utils/response-error");
let PaymentService = class PaymentService {
    constructor() { }
    async getPayments(params) {
        const { userId, transactionId, page = 1, limit = 5 } = params;
        const queryBuilder = Payment_1.Payment.createQueryBuilder('payment')
            .leftJoinAndSelect('payment.user', 'user')
            .leftJoinAndSelect('payment.resource', 'resource')
            .leftJoinAndSelect('payment.transaction', 'transaction')
            .orderBy('payment.status', 'ASC')
            .addOrderBy('payment.createdAt', 'ASC');
        if (userId) {
            queryBuilder.where('payment.user_id = :userId', { userId });
        }
        if (transactionId) {
            queryBuilder.where('payment.transaction_id = :transactionId', { transactionId });
        }
        const payments = await (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { limit, page });
        return payments;
    }
    async createPayment(params, etm) {
        await this.validateCreatePayment(params, etm);
        const { price, type, resourceId, transactionId, userId } = params;
        const user = await etm.findOne(User_1.User, {
            where: { id: userId },
        });
        const transaction = await etm.findOne(Transaction_1.Transaction, {
            where: {
                id: transactionId,
            },
        });
        const resource = await etm.findOne(Resource_1.Resource, {
            where: {
                id: resourceId,
            },
        });
        const payment = await Payment_1.Payment.findOrInit({ price, type, userId, transactionId });
        payment.user = user;
        if (type === Payment_1.PaymentType.PAID && transaction) {
            payment.transaction = transaction;
        }
        if (type === Payment_1.PaymentType.BUY && resource) {
            payment.resource = resource;
        }
        return await etm.save(payment);
    }
    async confirmPayment(params, etm) {
        const { paymentId } = params;
        const payment = await Payment_1.Payment.findOne({
            where: {
                id: paymentId,
            },
            relations: ['user', 'transaction'],
        });
        if (!payment)
            (0, response_error_1.validateError)('Payment not found');
        payment.status = Payment_1.PaymentStatus.SETTLED;
        await etm.save(payment);
        const { user, transaction } = payment;
        await user.updateBalance(etm);
        await transaction.updateRemain(etm);
        return payment;
    }
    async confirmUserAllPayments(params, etm) {
        const { userId } = params;
        const user = await User_1.User.findOneBy({
            id: userId,
        });
        const payments = await Payment_1.Payment.find({
            where: {
                userId,
                status: Payment_1.PaymentStatus.PENDING,
            },
            relations: ['transaction', 'user'],
        });
        const resultPayments = await payments.map(async (payment) => {
            const { id: paymentId } = payment;
            const resultPayment = await this.confirmPayment({
                paymentId,
            }, etm);
            return resultPayment;
        });
        await Promise.all(resultPayments);
        await user.updateBalance(etm);
        return {
            payments: resultPayments,
        };
    }
    async validateCreatePayment(params, etm) {
        const { price, type, resourceId, transactionId, userId } = params;
        const user = await etm.findOne(User_1.User, {
            where: {
                id: userId,
            },
            relations: ['transactions'],
        });
        const resource = await etm.findOne(Resource_1.Resource, {
            where: {
                id: resourceId,
            },
        });
        const transaction = await etm.findOne(Transaction_1.Transaction, {
            where: {
                id: transactionId,
            },
        });
        const payment = await etm.findOne(Payment_1.Payment, {
            where: [
                {
                    price,
                    type,
                    userId,
                    transactionId,
                },
            ],
        });
        const isValidTransaction = user.transactions.find(({ id }) => id === transactionId);
        if (payment)
            (0, response_error_1.validateError)('Payment is exists on Transaction Id');
        if (!user)
            (0, response_error_1.validateError)('User not found');
        if (resourceId && !transactionId && !resource)
            (0, response_error_1.validateError)('Resource not found');
        if ((!resourceId && transactionId && !transaction) ||
            (transactionId && transaction && !isValidTransaction))
            (0, response_error_1.validateError)('Transaction not found');
        if (resourceId && transactionId)
            (0, response_error_1.validateError)('Can not Payment both Resource and Transaction in same time');
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map