import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from '@bull-board/express'
import { Queue } from 'bullmq'
import { FirstProcessorConstants } from './first.processor'
export const bullServerAdapter = new ExpressAdapter()

@Injectable()
export class BullBoardProvider {
  constructor(
    @InjectQueue(FirstProcessorConstants.PROCESS_NAME)
    private readonly firstQueue: Queue,
  ) {
    createBullBoard({
      queues: [new BullMQAdapter(this.firstQueue)],
      serverAdapter: bullServerAdapter,
    })
  }
}
