import { Injectable } from '@nestjs/common'
import { Resource } from 'src/db/entities/Resource'
import { Transaction } from 'src/db/entities/Transaction'
import { User } from 'src/db/entities/User'
import { validateError } from 'src/utils/response-error'
import { EntityManager, In } from 'typeorm'
import { CreateTransactionParamsDto, GetTransactionParamsDto } from './dto/transaction-params.dto'

@Injectable()
export class TransactionService {
  constructor() {}
  async getTransactions(params: GetTransactionParamsDto) {
    const { userId } = params

    if (userId) {
      const user = await User.findOne(userId, {
        relations: ['transactions', 'transactions.users', 'transactions.resources'],
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
    return await etm.save(transaction)
  }
}
