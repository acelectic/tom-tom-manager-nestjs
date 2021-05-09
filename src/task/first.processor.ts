import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  OnQueueStalled,
  OnQueueWaiting,
  Process,
  Processor,
} from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('first')
export class FirstProcessor {
  private readonly logger = new Logger(FirstProcessor.name)

  @Process('firstProcess')
  handleProcess(job: Job) {
    console.log('process', job.data)
    // for (let i = 0; i < 100; i++) {
    //   job.progress(i)
    // }
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
