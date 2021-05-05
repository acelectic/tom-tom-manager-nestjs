import { Injectable } from '@nestjs/common'
import { Resource } from 'src/db/entities/Resource'
import { EntityManager } from 'typeorm'
import { CreateReourceParamsDto } from './dto/resource-params.dto'

@Injectable()
export class ResourceService {
  constructor() {}
  async getResources() {
    const resources = await Resource.find()
    return {
      resources,
    }
  }

  // async getUserWithId(userId: string) {
  //   return await User.findOne(userId)
  // }

  async createResource(params: CreateReourceParamsDto, etm: EntityManager) {
    const { name, price } = params
    const resource = await Resource.findOrInit({ name, price })
    return await etm.save(resource)
  }
}
