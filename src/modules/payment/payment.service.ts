import { Injectable } from '@nestjs/common'
import { Payment, PaymentType } from 'src/db/entities/Payment'
import { Resource } from 'src/db/entities/Resource'
import { Transaction } from 'src/db/entities/Transaction'
import { User } from 'src/db/entities/User'
import { validateError } from 'src/utils/response-error'
import { EntityManager } from 'typeorm'
import { CreatePaymentParamsDto } from './dto/payment-params.dto'

@Injectable()
export class PaymentService {
  constructor() {}
  async getPayments() {
    const payments = await Payment.find({
      relations: ['user', 'resource', 'transaction'],
    })
    return {
      payments,
    }
  }

  async createPayment(params: CreatePaymentParamsDto, etm: EntityManager) {
    await this.validateCreatePayment(params)
    const { price, type, resourceId, transactionId, userId } = params
    const user = await User.findOne(userId)
    const transaction = await Transaction.findOne(transactionId)
    const resource = await Resource.findOne(resourceId)
    const payment = await Payment.findOrInit({ price, type, userId, transactionId, resourceId })
    payment.user = user

    if (type === PaymentType.PAID && transaction) {
      payment.transaction = transaction
    }
    if (type === PaymentType.BUY && resource) {
      payment.resource = resource
    }

    return await etm.save(payment)
  }

  private async validateCreatePayment(params: CreatePaymentParamsDto) {
    const { price, type, resourceId, transactionId, userId } = params
    const user = await User.findOne(userId, { relations: ['transactions'] })
    const resource = await Resource.findOne({
      id: resourceId,
    })
    const transaction = await Transaction.findOne({
      id: transactionId,
    })

    const payment = await Payment.findOne({
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
