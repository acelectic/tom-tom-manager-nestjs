import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from '@bull-board/express'
import { Queue } from 'bull'
import { FirstProcessorConstants } from './first.processor'

export const bullServerAdapter = new ExpressAdapter()

@Injectable()
export class BullBoardProvider {
  constructor(
    @InjectQueue(FirstProcessorConstants.PROCESS_NAME)
    private readonly firstQueue: Queue,
  ) {
    createBullBoard({
      queues: [new BullAdapter(this.firstQueue)],
      serverAdapter: bullServerAdapter,
    })
  }
}
