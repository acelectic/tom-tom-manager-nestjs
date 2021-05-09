import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TaskController } from './task.controller'
import { BullBoardProvider } from './bull-board.provider'
import { TaskService } from './task.service'

@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'first' },
      // { name: 'dca' },
      // { name: 'notify' },
      // { name: 'transaction' },
    ),
  ],
  controllers: [TaskController],
  providers: [BullBoardProvider, TaskService],
})
export class TaskModule {}
