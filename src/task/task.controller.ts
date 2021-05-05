import { InjectQueue } from '@nestjs/bull'
import { Controller, Param, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Queue } from 'bull'

@ApiTags('task')
@Controller('v1/tasks')
export class TaskController {
  constructor(
    @InjectQueue('first') private readonly firstQueue: Queue, // @InjectQueue('notify') private readonly notifyQueue: Queue,
  ) {}
  @Post('first-process')
  async transcode() {
    await this.firstQueue.add('firstProcess')
    await this.firstQueue.resume()
    return { message: 'success' }
  }
  // @Post('test-dca')
  // async testDca(@Query('password') password: string) {
  //   if (password !== 'testDca1q2w') {
  //     return
  //   } else {
  //     await this.dcaQueue.add('autoBuyDca')
  //     return { message: 'success' }
  //   }
  // }
  // @Post('resume-dca')
  // async resumeDca() {
  //   return await this.dcaQueue.resume()
  // }
  // @Post('resume-notify')
  // async notify() {
  //   return await this.notifyQueue.resume()
  // }
  // @Post('stop-dca')
  // async stopDca() {
  //   return await this.dcaQueue.pause()
  // }
}
