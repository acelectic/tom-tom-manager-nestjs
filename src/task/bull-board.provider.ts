import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from '@bull-board/express'
import { Queue } from 'bull'

export const bullServerAdapter = new ExpressAdapter()

@Injectable()
export class BullBoardProvider {
  constructor(
    @InjectQueue('first')
    private readonly firstQueue: Queue, // @InjectQueue('dca')
  ) // private readonly dcaQueue: Queue,
  // @InjectQueue('notify')
  // private readonly notifyQueue: Queue,
  // @InjectQueue('transaction')
  // private readonly transactionQueue: Queue,
  {
    createBullBoard({
      queues: [new BullAdapter(firstQueue)],
      serverAdapter: bullServerAdapter,
    })
  }
}
