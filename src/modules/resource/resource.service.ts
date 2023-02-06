import { Injectable } from '@nestjs/common'
import { Resource } from 'src/db/entities/Resource'
import { EntityManager } from 'typeorm'
import {
  CreateResourceParamsDto,
  GetResourcesParamsDto,
  UpdateResourceIsActiveParamsDto,
} from './dto/resource-params.dto'

@Injectable()
export class ResourceService {
  constructor() {}
  async getResources(params: GetResourcesParamsDto) {
    const { isActive } = params
    const queryBuilder = Resource.createQueryBuilder('resources').orderBy({
      ref: 'ASC',
    })

    if (isActive === true || isActive === false) {
      queryBuilder.where({
        isActive,
      })
    }

    const resources = await queryBuilder.getMany()
    return {
      resources,
    }
  }

  // async getUserWithId(userId: string) {
  //   return await User.findOne(userId)
  // }

  async createResource(params: CreateResourceParamsDto, etm: EntityManager) {
    const { name, price } = params
    const resource = await Resource.findOrInit({ name, price })
    return await etm.save(resource)
  }

  async updateTemplateActiveStatus(
    resourceId: string,
    params: UpdateResourceIsActiveParamsDto,
    etm: EntityManager,
  ) {
    const { isActive } = params
    const resource = await Resource.findOne(resourceId)
    resource.isActive = isActive
    return await etm.save(resource)
  }
}
