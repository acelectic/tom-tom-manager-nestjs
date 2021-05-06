import { Injectable } from '@nestjs/common'
import { Resource } from 'src/db/entities/Resource'
import { Template } from 'src/db/entities/Template'
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
    const resources = await Template.find({
      where: { isActive },
      relations: ['resources'],
    })
    return {
      resources,
    }
  }

  // async getUserWithId(userId: string) {
  //   return await User.findOne(userId)
  // }

  async createTemplate(params: CreateTemplateParamsDto, etm: EntityManager) {
    const { resourceIds, isActive = true } = params
    const resources = await Resource.findByIds(resourceIds)
    const template = await Template.create({ isActive, resources })
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
