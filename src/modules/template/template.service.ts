import { Injectable } from '@nestjs/common'
import { concat, unionBy } from 'lodash'
import { Resource } from 'src/db/entities/Resource'
import { Template } from 'src/db/entities/Template'
import { debugLog } from 'src/utils/helper'
import { EntityManager, In } from 'typeorm'
import {
  CreateTemplateParamsDto,
  GetTemplatesParamsDto,
  UpdateTemplateIsActiveParamsDto,
  UpdateTemplateParamsDto,
} from './dto/template-params.dto'

@Injectable()
export class TemplateService {
  constructor() {}
  async getTemplates(queryParams: GetTemplatesParamsDto) {
    const { isActive } = queryParams
    const queryBuilder = Template.createQueryBuilder('template')
      .leftJoinAndSelect('template.resources', 'resources')
      .orderBy('template.is_active', 'DESC')
      .addOrderBy('template.ref', 'ASC')

    if (isActive !== undefined) {
      queryBuilder.where('template.is_active = :isActive', {
        isActive,
      })
    }
    const templates = await queryBuilder.getMany()
    return {
      templates,
    }
  }

  async createTemplate(params: CreateTemplateParamsDto, etm: EntityManager) {
    const { name, description, isActive = true, resourceIds } = params
    const resources = await Resource.find({
      where: {
        id: In(resourceIds),
      },
      relations: ['templates'],
    })

    const template = await etm.create(Template, { name, description, isActive })
    await etm.save(template)

    if (resourceIds?.length && resources.length) {
      template.resources = resources
    }
    await etm.save(template)
    return template
  }

  async updateTemplate(templateId: string, params: UpdateTemplateParamsDto, etm: EntityManager) {
    const { name, description, resourceIds, isActive } = params
    const template = await Template.findOneBy({
      id: templateId,
    })
    const resources = await Resource.findBy({
      id: In(resourceIds),
    })

    if (resourceIds?.length && resourceIds.length) {
      template.resources = resources
    }
    template.isActive = isActive
    template.name = name
    template.description = description
    return await etm.save(template)
  }

  async updateTemplateActiveStatus(
    templateId: string,
    params: UpdateTemplateIsActiveParamsDto,
    etm: EntityManager,
  ) {
    const { isActive } = params
    const template = await Template.findOneBy({
      id: templateId,
    })

    template.isActive = isActive
    debugLog({ isActive, template })

    return await etm.save(template)
  }

  private async addTemplateToresources(
    template: Template,
    resources: Resource[],
    etm: EntityManager,
  ) {
    const oldResources = await template.resources
    const newResources = [...oldResources, ...resources]
    template.resources = newResources
    await etm.save(template)

    return await Promise.all(newResources)
  }
}
