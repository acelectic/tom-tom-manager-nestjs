import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common'
import { ResourceService } from './resource.service'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import {
  CreateResourceParamsDto,
  GetResourcesParamsDto,
  UpdateResourceIsActiveParamsDto,
} from './dto/resource-params.dto'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'

@ApiTags('resources')
@Controller('v1/resources')
@Auth()
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  async getResources(@Query() params: GetResourcesParamsDto) {
    return this.resourceService.getResources(params)
  }

  @Post()
  @Transaction()
  async createResources(
    @Body() body: CreateResourceParamsDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return this.resourceService.createResource(body, etm)
  }

  @Patch(':resourceId/set-active')
  @Transaction()
  async updateTemplateActiveStatus(
    @Param('resourceId', new ParseUUIDPipe()) resourceId: string,
    @Body() bodyParams: UpdateResourceIsActiveParamsDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return this.resourceService.updateTemplateActiveStatus(resourceId, bodyParams, etm)
  }
}
