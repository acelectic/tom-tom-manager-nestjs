import { Injectable } from '@nestjs/common'
import { Resource } from 'src/db/entities/Resource'
import { Template } from 'src/db/entities/Template'
import { debugLog } from 'src/utils/helper'
import { EntityManager } from 'typeorm'
import {
  CreateTemplateParamsDto,
  GetTemplatesParamsDto,
  UpdateTemplateParamsDto,
} from './dto/template-params.dto'

@Injectable()
export class TemplateService {
  constructor() {}
  async getTemplates(queryParams: GetTemplatesParamsDto) {
    const { isActive = true } = queryParams
    const templates = await Template.find({
      where: { isActive },
      relations: ['resources'],
    })
    return {
      templates,
    }
  }

  async createTemplate(params: CreateTemplateParamsDto, etm: EntityManager) {
    const { resourceIds, isActive = true } = params
    const resources = await Resource.findByIds(resourceIds)
    debugLog({ resourceIds, resources })
    const template = await etm.create(Template, { isActive })
    await etm.save(template)
    await etm.update(Template, template, {
      resources,
    })
    debugLog({ template })
    return await etm.save(template)
  }

  async updateTemplate(templateId: string, params: UpdateTemplateParamsDto, etm: EntityManager) {
    const { resourceIds, isActive } = params
    const template = await Template.findOne(templateId)
    const resources = await Resource.findByIds(resourceIds)

    if (resourceIds?.length && resources.length) {
      template.resources = resources
    }
    if (isActive !== undefined) {
      template.isActive = isActive
    }
    return await etm.save(template)
  }
}
