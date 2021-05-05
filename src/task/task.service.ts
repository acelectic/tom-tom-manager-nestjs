import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression, Interval, Timeout, CronOptions } from '@nestjs/schedule'
import { Queue } from 'bullmq'
import dayjs from 'dayjs'

@Injectable()
export class TaskService {
  // constructor(@InjectQueue('first') private readonly firstQueue: Queue) {}
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
  // timeout() {
  //   const now = dayjs()
  //   console.log('Job Worked', now.format())
  // }
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
