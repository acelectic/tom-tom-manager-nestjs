import { Command, Console } from 'nestjs-console'
require('dayjs/locale/es')

import dayjs, { OpUnitType } from 'dayjs'
import { truncates } from 'src/utils/test-helper'
import { User } from 'src/db/entities/User'
import { Resource } from 'src/db/entities/Resource'
import { random, range, sample, sampleSize } from 'lodash'
import { Chance } from 'chance'
import { TransactionService } from '../transaction/transaction.service'
import { Connection, createConnection, EntityManager, getConnection } from 'typeorm'
import { debugLog } from 'src/utils/helper'
import { Transaction } from 'src/db/entities/Transaction'
import { PaymentService } from '../payment/payment.service'
import { PaymentType } from 'src/db/entities/Payment'
import { CreatePaymentParamsDto } from '../payment/dto/payment-params.dto'
import { Template } from 'src/db/entities/Template'

@Console()
export class AppConsoleService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly paymentService: PaymentService,
  ) {}

  @Command({
    command: 'test-cosole',
  })
  async testCosole() {
    const now = dayjs()

    console.log(now)
  }

  @Command({
    command: 'truncates',
  })
  async truncates() {
    await truncates('transactions', 'users', 'payments', 'resources')
  }

  @Command({
    command: 'mock-transactions',
  })
  async mockTransactions() {
    const connection: Connection = getConnection()
    const users = await User.find()
    const templates = await Template.find()

    for (const i in range(
      Chance().integer({
        min: 5,
        max: 30,
      }),
    )) {
      const etm: EntityManager = connection.createEntityManager()
      const usersSize = Chance().integer({ min: 1, max: users.length })
      const userSample = sampleSize(users, usersSize)
      const userIds = userSample.map(d => d.id)
      const template = sample(templates)
      const transaction = await this.transactionService.createTransaction(
        {
          userIds,
          templateId: template.id,
        },
        etm,
      )
      transaction.createdAt = Chance().date()
      debugLog({ transaction })
      await etm.save(transaction)
    }
    // debugLog({ temp })
    // await Promise.all(temp)

    // const etm: EntityManager = connection.createEntityManager()

    // const transactions = await Transaction.find()
    // const temp = transactions.map(async transaction => {
    //   const date = dayjs()
    //   const opTypes: OpUnitType[] = ['date', 'month']
    //   const sampleOpType = sample(opTypes)
    //   const rangDate = random(5, 20)
    //   const ranPlus = random(0, 1, true)
    //   if (ranPlus > 0.5) {
    //     date.add(rangDate, sampleOpType)
    //   } else {
    //     date.subtract(rangDate, sampleOpType)
    //   }
    //   transaction.createdAt = date.toDate()
    //   await etm.save(transaction)
    // })
    // await Promise.all(temp)
  }

  @Command({
    command: 'mock-payments',
  })
  async mockPayments() {
    const connection: Connection = getConnection()
    const users = await User.find({
      relations: ['transactions'],
    })
    const resources = await Resource.find()

    for (const i in range(
      Chance().integer({
        min: 5,
        max: 30,
      }),
    )) {
      const etm: EntityManager = connection.createEntityManager()
      const price = Chance().integer({ min: 200, max: 300 })
      const resource = sample(resources)
      const user = sample(users)
      const type = sample([PaymentType.BUY, PaymentType.PAID])
      const { transactions } = user
      const transaction = sample(transactions)
      const params: CreatePaymentParamsDto = {
        price,
        type,
        transactionId: transaction?.id,
        resourceId: resource?.id,
        userId: user?.id,
      }
      const payment = await this.paymentService.createPayment(params, etm)
      await etm.save(payment)
    }
  }
}

// 37a4eabc9a91ee7d80824122a22a9fc41e71e488a4a6ef896b430026c9549ef5
