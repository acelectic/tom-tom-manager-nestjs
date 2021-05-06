import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common'
import { TemplateService } from './template.service'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import {
  CreateTemplateParamsDto,
  GetTemplatesParamsDto,
  UpdateTemplateParamsDto,
} from './dto/template-params.dto'
import { TransactionManager, EntityManager, Transaction } from 'typeorm'
import { CreateReourceParamsDto } from '../resource/dto/resource-params.dto'

@ApiTags('templates')
@Controller('v1/templates')
@Auth()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async getTemplates(@Query() queryParams: GetTemplatesParamsDto) {
    return this.templateService.getTemplates(queryParams)
  }

  @Post()
  @Transaction()
  async createTemplate(
    @Body() bodyParams: CreateTemplateParamsDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return this.templateService.createTemplate(bodyParams, etm)
  }

  @Post(':templateId')
  @Transaction()
  async updateTemplate(
    @Param('templateId', new ParseUUIDPipe()) templateId: string,
    @Body() bodyParams: UpdateTemplateParamsDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return this.templateService.updateTemplate(templateId, bodyParams, etm)
  }
}
