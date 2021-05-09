import { Injectable } from '@nestjs/common'
import { ceil, sumBy } from 'lodash'
import { PaymentType } from 'src/db/entities/Payment'
import { Resource } from 'src/db/entities/Resource'
import { Template } from 'src/db/entities/Template'
import { Transaction } from 'src/db/entities/Transaction'
import { User } from 'src/db/entities/User'
import { debugLog } from 'src/utils/helper'
import { validateError } from 'src/utils/response-error'
import { EntityManager, In } from 'typeorm'
import { CreatePaymentParamsDto } from '../payment/dto/payment-params.dto'
import { PaymentService } from '../payment/payment.service'
import { CreateTransactionParamsDto, GetTransactionParamsDto } from './dto/transaction-params.dto'

@Injectable()
export class TransactionService {
  constructor(private readonly paymentService: PaymentService) {}
  async getTransactions(params: GetTransactionParamsDto) {
    const { userId } = params

    if (userId) {
      const user = await User.findOne(userId, {
        relations: ['transactions', 'transactions.users', 'transactions.payments'],
      })
      const transactions = user.transactions
      return { transactions }
    }

    const transactions = await Transaction.find({
      relations: ['users'],
      order: {
        createdAt: 'DESC',
      },
    })
    return { transactions }
  }

  async getTransactionsHistory() {
    const transactions = await Transaction.find({
      relations: ['users'],
      order: {
        createdAt: 'DESC',
      },
    })
    return { transactions }
  }

  async createTransaction(params: CreateTransactionParamsDto, etm: EntityManager) {
    const { userIds, templateId } = params
    const users = await User.find({
      id: In(userIds),
    })
    const template = await Template.findOne(templateId)

    const resources = await template.resources

    if (!users.length) {
      validateError('Users must least one')
    }
    if (!resources.length) {
      validateError('Resources must least one')
    }
    const price = sumBy(resources, ({ price }) => Number(price))
    const transaction = await Transaction.create({ price, users, template })
    await etm.save(transaction)
    debugLog('after create transaction')

    const paymentPrice = ceil(price / users.length, 0)
    const payments = await users.map(async ({ id: userId }) => {
      const params: CreatePaymentParamsDto = {
        price: paymentPrice,
        type: PaymentType.PAID,
        transactionId: transaction.id,
        userId: userId,
      }
      const payment = await this.paymentService.createPayment(params, etm)
      return payment
    })

    debugLog('after create payments')
    // debugLog({ payments })
    await Promise.all(payments)
    // await etm.save(payments)
    return { ...transaction, payments: [] }
  }
}
