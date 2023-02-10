import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  OnQueueStalled,
  OnQueueWaiting,
  Process,
} from '@nestjs/bull'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job, delay } from 'bullmq'
import { random } from 'lodash'

export enum FirstProcessorConstants {
  PROCESS_NAME = 'first',
  FIRST_PROCESS = 'firstProcess',
  SECOND_PROCESS = 'secondProcess',
}
@Processor(FirstProcessorConstants.PROCESS_NAME, {
  concurrency: 3,
})
export class FirstProcessor extends WorkerHost {
  private readonly logger = new Logger(FirstProcessor.name)

  async process(job: Job<any, any, FirstProcessorConstants>, token?: string): Promise<any> {
    switch (job.name) {
      case FirstProcessorConstants.FIRST_PROCESS:
        return this.firstProcess(job, token)
      case FirstProcessorConstants.SECOND_PROCESS:
        return this.secondProcess(job, token)
      default:
        return
    }
  }

  private async firstProcess(job: Job, token?: string) {
    console.log('firstProcess', job.id, ' START')
    await delay(5000)
    console.log('firstProcess', job.id, ' END')
    return 'completed'
  }

  private async secondProcess(job: Job, token?: string) {
    console.log('secondProcess', job.id, ' START')
    await delay(10000)
    if (random(1, 10) > 5) {
      // throw new Error('BREAK')
    }
    console.log('secondProcess', job.id, ' END')
    return 'completed'
  }

  @OnQueueError()
  onQueueError(error: Error) {
    console.log('onQueueError', error)
  }

  @OnQueueWaiting()
  onQuereWaiting(jobId: number) {
    console.log('onQuereWaiting', jobId)
  }

  @OnQueueActive()
  onQuereActive(job: Job) {
    console.log('onQuereActive', job.data)
  }

  @OnQueueStalled()
  onQuereStalled(job: Job) {
    console.log('onQuereStalled', job.data)
  }

  @OnQueueProgress()
  onQuereProgress(job: Job, progress: number) {
    console.log('onQueueProgress', progress)
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job, result: any) {
    console.log('onQueueCompleted', job.name, result)
  }
}
