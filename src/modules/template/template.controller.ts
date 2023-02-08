import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common'
import { TemplateService } from './template.service'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import {
  CreateTemplateParamsDto,
  GetTemplatesParamsDto,
  UpdateTemplateIsActiveParamsDto,
  UpdateTemplateParamsDto,
} from './dto/template-params.dto'
import { DataSource, EntityManager } from 'typeorm'
import { CreateResourceParamsDto } from '../resource/dto/resource-params.dto'

@ApiTags('templates')
@Controller('templates')
@Auth()
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  async getTemplates(@Query() queryParams: GetTemplatesParamsDto) {
    return this.templateService.getTemplates(queryParams)
  }

  @Post()
  async createTemplate(
    @Body() bodyParams: CreateTemplateParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.templateService.createTemplate(bodyParams, etm)
  }

  @Patch(':templateId')
  async updateTemplate(
    @Param('templateId', new ParseUUIDPipe()) templateId: string,
    @Body() bodyParams: UpdateTemplateParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.templateService.updateTemplate(templateId, bodyParams, etm)
  }

  @Patch(':templateId/set-active')
  async updateTemplateActiveStatus(
    @Param('templateId', new ParseUUIDPipe()) templateId: string,
    @Body() bodyParams: UpdateTemplateIsActiveParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.templateService.updateTemplateActiveStatus(templateId, bodyParams, etm)
  }
}
