import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { TaskController } from './task.controller'
import { BullBoardProvider } from './bull-board.provider'
import { TaskService } from './task.service'
import { FirstProcessor, FirstProcessorConstants } from './first.processor'

@Module({
  imports: [BullModule.registerQueue({ name: FirstProcessorConstants.PROCESS_NAME })],
  controllers: [TaskController],
  providers: [BullBoardProvider, TaskService, FirstProcessor],
})
export class TaskModule {}
