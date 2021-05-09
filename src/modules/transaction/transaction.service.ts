import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { ceil, sumBy } from 'lodash'
import { paginate } from 'nestjs-typeorm-paginate'
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
import {
  CreateTransactionParamsDto,
  GetTransactionHistoryParamsDto,
  GetTransactionParamsDto,
} from './dto/transaction-params.dto'

@Injectable()
export class TransactionService {
  constructor(private readonly paymentService: PaymentService) {}
  async getTransactions(params: GetTransactionParamsDto) {
    const { userId, page = 1, limit = 5 } = params

    if (userId) {
      const { transactions: userTransactions } = await User.findOne(userId, {
        relations: ['transactions'],
      })
      const transactionIds = userTransactions.map(({ id }) => id)
      const queryBuilder = Transaction.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.users', 'users')
        .orderBy('transaction.completed', 'ASC')
        .addOrderBy('transaction.createdAt', 'DESC')
        .where('transaction.id in (:...transactionIds)', { transactionIds })

      const transactions = await paginate(queryBuilder, { page, limit })
      return transactions
    }

    const queryBuilder = Transaction.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.users', 'users')
      .orderBy('transaction.completed', 'ASC')
      .addOrderBy('transaction.createdAt', 'DESC')

    const transactions = await paginate(queryBuilder, { page, limit })
    return transactions
  }

  async getTransactionsHistory(parmas: GetTransactionHistoryParamsDto) {
    const { userId, status, endDate, startDate = dayjs().subtract(30, 'day') } = parmas
    const queryBuilder = Transaction.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.users', 'users')
      .orderBy('transaction.completed', 'ASC')
      .addOrderBy('transaction.createdAt', 'DESC')

    if (startDate) {
      queryBuilder.andWhere('transaction.created_at > :startDate', {
        startDate: startDate.toISOString(),
      })
    }
    if (endDate) {
      queryBuilder.andWhere('transaction.created_at < :endDate', {
        endDate: endDate.toISOString(),
      })
    }
    if (userId) {
      queryBuilder.andWhere('transaction.user_id = :userId', {
        userId,
      })
    }
    if (status) {
      queryBuilder.andWhere('transaction.completed = :status', {
        status,
      })
    }
    const transactions = await queryBuilder.getMany()
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
