import { Injectable } from '@nestjs/common'
import { ceil } from 'lodash'
import { PaymentType } from 'src/db/entities/Payment'
import { Resource } from 'src/db/entities/Resource'
import { Transaction } from 'src/db/entities/Transaction'
import { User } from 'src/db/entities/User'
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
        relations: [
          'transactions',
          'transactions.users',
          'transactions.resources',
          'transactions.payments',
        ],
      })
      const transactions = user.transactions
      return { transactions }
    }

    const transactions = await Transaction.find({
      relations: ['users', 'resources'],
      order: {
        createdAt: 'DESC',
      },
    })
    return { transactions }
  }

  async getTransactionsHistory() {
    const transactions = await Transaction.find({
      relations: ['users', 'resources'],
      order: {
        createdAt: 'DESC',
      },
    })
    return { transactions }
  }

  async createTransaction(params: CreateTransactionParamsDto, etm: EntityManager) {
    const { price, detail, resourceIds, userIds } = params
    const users = await User.find({
      id: In(userIds),
    })
    const resources = await Resource.find({
      id: In(resourceIds),
    })
    if (!users.length) {
      validateError('Users must least one')
    }
    if (!resources.length) {
      validateError('Resources must least one')
    }
    const transaction = await Transaction.create({ price, detail, resources, users })
    await etm.save([transaction, users, resources])
    const paymentPrice = ceil(price / users.length, 0)
    const payments = await users.map(({ id: userId }) => {
      const params: CreatePaymentParamsDto = {
        price: paymentPrice,
        type: PaymentType.PAID,
        transactionId: transaction.id,
        userId: userId,
      }
      const payment = this.paymentService.createPayment(params, etm)
      return payment
    })
    await etm.save(payments)
    return { ...transaction, payments }
  }
}
