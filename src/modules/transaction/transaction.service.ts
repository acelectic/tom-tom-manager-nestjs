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

    const queryBuilder = Transaction.createQueryBuilder('transaction')
      .leftJoinAndSelect('users', 'users')
      .orderBy('transaction.completed', 'ASC')
      .addOrderBy('transaction.created_at', 'DESC')
    if (userId) {
      queryBuilder.where({
        userId,
      })
    }
    const transactions = await queryBuilder.getMany()
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

    const paymentPrice = ceil(price / users.length, 0)
    const payments = await users.map(async user => {
      const { id: userId } = user
      const params: CreatePaymentParamsDto = {
        price: paymentPrice,
        type: PaymentType.PAID,
        transactionId: transaction.id,
        userId: userId,
      }
      const payment = await this.paymentService.createPayment(params, etm)
      user.balance = user.balance - paymentPrice
      await etm.save(user)
      return payment
    })
    await Promise.all(payments)
    return { ...transaction, payments: [] }
  }
}
