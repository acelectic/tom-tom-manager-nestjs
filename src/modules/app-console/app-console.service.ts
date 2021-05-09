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
import { hash } from 'bcrypt'
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
    const templates = await Template.find({
      where: {
        isActive: true,
      },
    })

    for (const i in range(
      Chance().integer({
        min: 20,
        max: 20,
      }),
    )) {
      const etm: EntityManager = connection.createEntityManager()
      const usersSize = Chance().integer({ min: 1, max: users.length })
      const userSample = sampleSize(users, usersSize)
      const userIds = userSample.map(d => d.id)
      const template = sample(templates)
      const { transaction } = await this.transactionService.createTransaction(
        {
          userIds,
          templateId: template.id,
        },
        etm,
      )
      const dateRandom = Chance().integer({ max: 5, min: 1 })
      transaction.createdAt = dayjs()
        .tz()
        .subtract(dateRandom, 'day')
        .toDate()
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
    command: 'mock-users',
  })
  async mockPayments() {
    const connection: Connection = getConnection()
    const etm: EntityManager = connection.createEntityManager()
    const password = '123456'
    const encryptPassword = await hash(password, 10)
    for (const i in range(
      Chance().integer({
        min: 5,
        max: 30,
      }),
    )) {
      const name = Chance().name({ middle: true, middle_initial: true })
      const email = Chance().email({
        domain: 'test.com',
        length: 10,
      })
      const user = await User.findOrInit({
        email,
        name,
      })
      user.password = encryptPassword
      await etm.save(user)
    }
  }
}

// 37a4eabc9a91ee7d80824122a22a9fc41e71e488a4a6ef896b430026c9549ef5
