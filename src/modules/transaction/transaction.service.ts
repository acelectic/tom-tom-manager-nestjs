import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { ceil, isBoolean, sumBy } from 'lodash'
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
      const { transactions: userTransactions } = await User.findOne({
        where: {
          id: userId,
        },
        relations: ['transactions'],
      })
      const transactionIds = userTransactions.map(({ id }) => id)
      const queryBuilder = Transaction.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.users', 'users')
        .orderBy('transaction.completed', 'ASC')
        .addOrderBy('transaction.createdAt', 'ASC')
        .where('transaction.id in (:...transactionIds)', { transactionIds })

      const transactions = await paginate(queryBuilder, { page, limit })
      return transactions
    }

    const queryBuilder = Transaction.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.users', 'users')
      .orderBy('transaction.completed', 'ASC')
      .addOrderBy('transaction.createdAt', 'ASC')

    const transactions = await paginate(queryBuilder, { page, limit })
    return transactions
  }

  async getTransactionsHistory(params: GetTransactionHistoryParamsDto) {
    const { userId, status, endDate, startDate = dayjs().subtract(30, 'day') } = params
    const queryBuilder = Transaction.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.users', 'users')
      .orderBy('transaction.completed', 'ASC')
      .addOrderBy('transaction.createdAt', 'DESC')

    if (startDate) {
      queryBuilder.andWhere('transaction.created_at > :startDate', {
        startDate: dayjs(startDate).tz().toISOString(),
      })
    }
    if (endDate) {
      queryBuilder.andWhere('transaction.created_at < :endDate', {
        endDate: dayjs(endDate).tz().toISOString(),
      })
    }
    if (userId) {
      queryBuilder.andWhere('transaction.user_id = :userId', {
        userId,
      })
    }
    if (isBoolean(status)) {
      queryBuilder.andWhere('transaction.completed = :status', {
        status,
      })
    }
    const transactions = await queryBuilder.getMany()
    return { transactions }
  }

  async getTransaction(transactionId: string) {
    const transaction = await Transaction.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.users', 'users')
      .leftJoinAndSelect('transaction.payments', 'payments')
      .leftJoinAndSelect('transaction.template', 'template')
      .where('transaction.id = :transactionId', { transactionId })
      .getOne()

    return transaction
  }

  async createTransaction(params: CreateTransactionParamsDto, etm: EntityManager) {
    const { userIds, templateId } = params
    const users = await User.findBy({
      id: In(userIds),
    })
    const template = await Template.findOneBy({
      id: templateId,
    })

    const resources = await template.resources

    if (!users.length) {
      validateError('Users must least one')
    }
    if (!resources.length) {
      validateError('Resources must least one')
    }
    const price = sumBy(resources, ({ price }) => Number(price))
    const transaction = await Transaction.create({
      price,
      remain: price,
      users,
      template,
      meta: {
        resources,
      },
    })
    await etm.save(transaction)

    const paymentPrice = ceil(price / users.length, 0)
    const payments = await users.map(async (user) => {
      const { id: userId } = user
      const params: CreatePaymentParamsDto = {
        price: paymentPrice,
        type: PaymentType.PAID,
        transactionId: transaction.id,
        userId: userId,
      }
      const payment = await this.paymentService.createPayment(params, etm)
      await user.updateBalance(etm)
      return payment
    })
    await Promise.all(payments)
    return { transaction, payments }
  }
}
