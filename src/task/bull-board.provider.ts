import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { BullAdapter, setQueues } from 'bull-board'
import { Queue } from 'bull'

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
    setQueues([
      new BullAdapter(firstQueue),
      // new BullAdapter(notifyQueue),
      // new BullAdapter(transactionQueue),
    ])
  }
}
