import { Injectable } from '@nestjs/common'
import { sumBy } from 'lodash'
import { paginate } from 'nestjs-typeorm-paginate'
import { Payment, PaymentStatus, PaymentType } from 'src/db/entities/Payment'
import { Resource } from 'src/db/entities/Resource'
import { Transaction } from 'src/db/entities/Transaction'
import { User } from 'src/db/entities/User'
import { debugLog } from 'src/utils/helper'
import { validateError } from 'src/utils/response-error'
import { EntityManager, Not } from 'typeorm'
import {
  ConfirmPaymentParamsDto,
  ConfirmUserAllPaymentParamsDto,
  CreatePaymentParamsDto,
  GetPaymentsParamsDto,
} from './dto/payment-params.dto'

@Injectable()
export class PaymentService {
  constructor() {}
  async getPayments(params: GetPaymentsParamsDto) {
    const { userId, transactionId, page = 1, limit = 5 } = params
    const queryBuilder = Payment.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.user', 'user')
      .leftJoinAndSelect('payment.resource', 'resource')
      .leftJoinAndSelect('payment.transaction', 'transaction')
      .orderBy('payment.status', 'ASC')
      .addOrderBy('payment.createdAt', 'ASC')

    if (userId) {
      queryBuilder.where('payment.user_id = :userId', { userId })
    }
    if (transactionId) {
      queryBuilder.where('payment.transaction_id = :transactionId', { transactionId })
    }
    const payments = await paginate(queryBuilder, { limit, page })
    return payments
  }

  async createPayment(params: CreatePaymentParamsDto, etm: EntityManager) {
    await this.validateCreatePayment(params, etm)
    const { price, type, resourceId, transactionId, userId } = params
    const user = await etm.findOne(User, userId)
    const transaction = await etm.findOne(Transaction, transactionId)

    const resource = await etm.findOne(Resource, resourceId)
    const payment = await Payment.findOrInit({ price, type, userId, transactionId })
    payment.user = user

    if (type === PaymentType.PAID && transaction) {
      payment.transaction = transaction
    }
    if (type === PaymentType.BUY && resource) {
      payment.resource = resource
    }

    return await etm.save(payment)
  }

  async confirmPayment(params: ConfirmPaymentParamsDto, etm: EntityManager) {
    const { paymentId } = params
    const payment = await Payment.findOne(paymentId, { relations: ['user', 'transaction'] })
    if (!payment) validateError('Payment not found')
    payment.status = PaymentStatus.SETTLED
    await etm.save(payment)

    const { user, transaction } = payment
    await user.updateBalance(etm)
    await transaction.updateRemain(etm)
    return payment
  }

  async confirmUserAllPayments(params: ConfirmUserAllPaymentParamsDto, etm: EntityManager) {
    const { userId } = params
    const user = await User.findOne(userId)
    const payments = await Payment.find({
      where: {
        userId,
        status: PaymentStatus.PENDING,
      },
      relations: ['transaction', 'user'],
    })
    const resultPayments = await payments.map(async payment => {
      const { id: paymentId } = payment
      const resultPayment = await this.confirmPayment(
        {
          paymentId,
        },
        etm,
      )
      return resultPayment
    })
    await Promise.all(resultPayments)
    await user.updateBalance(etm)
    return {
      payments: resultPayments,
    }
  }

  private async validateCreatePayment(params: CreatePaymentParamsDto, etm: EntityManager) {
    const { price, type, resourceId, transactionId, userId } = params
    const user = await etm.findOne(User, userId, { relations: ['transactions'] })
    const resource = await etm.findOne(Resource, {
      id: resourceId,
    })
    const transaction = await etm.findOne(Transaction, {
      id: transactionId,
    })
    const payment = await etm.findOne(Payment, {
      where: [
        {
          price,
          type,
          userId,
          transactionId,
        },
      ],
    })
    const isValidTransaction = user.transactions.find(({ id }) => id === transactionId)

    if (payment) validateError('Payment is exists on Transaction Id')
    if (!user) validateError('User not found')
    if (resourceId && !transactionId && !resource) validateError('Resource not found')
    if (
      (!resourceId && transactionId && !transaction) ||
      (transactionId && transaction && !isValidTransaction)
    )
      validateError('Transaction not found')
    if (resourceId && transactionId)
      validateError('Can not Payment both Resource and Transaction in same time')
  }
}
