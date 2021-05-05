import { Body, Controller, Get, Post } from '@nestjs/common'
import { ResourceService } from './resource.service'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import { CreateReourceParamsDto } from './dto/resource-params.dto'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'

@ApiTags('resources')
@Controller('v1/resources')
@Auth()
export class ResourceController {
  constructor(private readonly resouceService: ResourceService) {}

  @Get()
  async getResources() {
    return this.resouceService.getResources()
  }

  @Post()
  @Transaction()
  async createResources(
    @Body() body: CreateReourceParamsDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return this.resouceService.createResource(body, etm)
  }
}
