import { BullModule } from '@nestjs/bullmq'
import { Module, Provider } from '@nestjs/common'
import { TaskController } from './task.controller'
import { BullBoardProvider } from './bull-board.provider'
import { TaskService } from './task.service'
import { FirstProcessor, FirstProcessorConstants } from './first.processor'
import { appConfig } from 'src/config/app-config'

const providers: Provider[] = [BullBoardProvider, TaskService]

// add processor here
if (appConfig.ENABLE_TASKS) {
  providers.push(...[FirstProcessor])
}

@Module({
  imports: [BullModule.registerQueue({ name: FirstProcessorConstants.PROCESS_NAME })],
  controllers: [TaskController],
  providers,
})
export class TaskModule {}
