import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression, Interval, Timeout, CronOptions } from '@nestjs/schedule'
import { Queue } from 'bullmq'
import dayjs from 'dayjs'
import { FirstProcessorConstants } from './first.processor'
import { range } from 'lodash'
import { v4 } from 'uuid'
import { DataSource } from 'typeorm'
import { Transaction } from 'src/db/entities/Transaction'
import { User } from 'src/db/entities/User'

@Injectable()
export class TaskService {
  constructor(
    @InjectQueue(FirstProcessorConstants.PROCESS_NAME) private readonly firstQueue: Queue,
    private readonly dataSource: DataSource,
  ) {}
  // run every 2 sec
  // @Cron('*/2 * * * * *', { name: 'job1' })
  // cronJob() {
  //   console.log('job1')
  // }
  // run every 5 sec
  // @Cron(CronExpression.EVERY_5_SECONDS, { name: 'job2', timeZone: 'Asia/Bangkok' })
  // cronJob2() {
  //   const now = dayjs()
  //   console.log('job2', now.format())
  // }
  // run once after serve start 1 sec
  // @Timeout('Test Job', 1000)
  async timeout() {
    const now = dayjs()
    for (const index of range(10)) {
      // const parentId = v4()

      const firstProcess = await this.firstQueue.add(FirstProcessorConstants.FIRST_PROCESS, {
        index,
      })

      const { id: parentId } = firstProcess

      const secondProcess = await this.firstQueue.add(
        FirstProcessorConstants.SECOND_PROCESS,
        { index, parentId },
        {
          // parent: {
          //   id: parentId,
          //   queue: `bull:${FirstProcessorConstants.PROCESS_NAME}`,
          // },
          // failParentOnFailure: true,
        },
      )
      // await this.firstQueue.addBulk([
      //   {
      //     name: FirstProcessorConstants.FIRST_PROCESS,
      //     data: {
      //       index,
      //     },
      //     opts: {
      //       jobId: parentId,
      //     },
      //   },
      //   {
      //     name: FirstProcessorConstants.SECOND_PROCESS,
      //     data: {
      //       index,
      //       parentId,
      //     },
      //     opts: {
      //       parent: {
      //         id: parentId,
      //         queue: FirstProcessorConstants.SECOND_PROCESS,
      //       },
      //       failParentOnFailure: true,
      //     },
      //   },
      // ])
      // await firstProcess.moveToWaitingChildren(this.firstQueue.token, {
      //   child: {
      //     id: secondProcess.id,
      //     queue: FirstProcessorConstants.PROCESS_NAME,
      //   },
      // })
    }

    console.log('Job Worked', now.format())
  }

  // @Timeout('Test Job', 1000)
  async reCalculateBalance() {
    const etm = this.dataSource.createEntityManager()

    const transactionRepository = await this.dataSource.getRepository(Transaction)
    const transactions = await transactionRepository.find({
      where: {
        completed: false,
      },
    })

    await Promise.all(transactions.map((transaction) => transaction.updateRemain(etm)))

    const userRepository = await this.dataSource.getRepository(User)
    const users = await userRepository.find()
    await Promise.all(users.map((user) => user.updateBalance(etm)))
  }
  // @Cron(`*/5 * * * * *`, { name: 'job3' })
  // cronJob3() {
  //   const now = dayjs()
  //   console.log('job3 --------------', now.format())
  // }
  // run every 2 sec
  // @Interval(2000)
  // intervale() {
  //   console.log('job4')
  // }
  // @Cron('0 0 10 * * *', { name: 'buyDca' })
  // cronJob() {
  //   this.dcaService.scheduleBuyDca()
  // }
  // @Cron(CronExpression.EVERY_5_SECONDS, { name: 'job2' })
  // cronJob2() {
  //   this.notifyQueue.add('send_message', {})
  // }
  // @Cron(CronExpression.EVERY_30_MINUTES, { name: 'autoBuyDca' })
  // cronJob() {
  //   this.dcaQueue.add('autoBuyDca', {})
  // }
  // @Cron(CronExpression.EVERY_DAY_AT_3AM, { name: 'autoBuyDca' })
  // cronJob() {
  //   this.dcaQueue.add('autoBuyDca', {})
  // }
  // clear at second 1
  // @Cron('1 * * * * *', { name: 'clearPendingTransaction' })
  // clearPendingTransaction() {
  //   this.transactionQueue.add('clearPendingTransaction', {})
  // }
}
