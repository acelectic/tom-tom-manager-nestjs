import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common'
import { ResourceService } from './resource.service'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import {
  CreateResourceParamsDto,
  GetResourcesParamsDto,
  UpdateResourceIsActiveParamsDto,
} from './dto/resource-params.dto'
import { DataSource, EntityManager } from 'typeorm'

@ApiTags('resources')
@Controller('resources')
@Auth()
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  async getResources(@Query() params: GetResourcesParamsDto) {
    return this.resourceService.getResources(params)
  }

  @Post()
  async createResources(
    @Body() body: CreateResourceParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.resourceService.createResource(body, etm)
  }

  @Patch(':resourceId/set-active')
  async updateTemplateActiveStatus(
    @Param('resourceId', new ParseUUIDPipe()) resourceId: string,
    @Body() bodyParams: UpdateResourceIsActiveParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.resourceService.updateTemplateActiveStatus(resourceId, bodyParams, etm)
  }
}
