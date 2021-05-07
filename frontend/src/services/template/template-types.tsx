import { ResourceEntity } from '../resource/resource-types'

export interface TemplateEntity {
  id: string
  ref: string
  isActive: boolean
  resources?: ResourceEntity[]
}

export interface GetTemplateResponse {
  templates: TemplateEntity[]
}

export interface CreateTemplateParams {
  resourceIds: string[]
  isActive?: boolean
}
export interface CreateTemplateResponse extends TemplateEntity {}

export interface UpdateTemplateParams {
  templateId: string
  resourceIds?: string[]
  isActive?: boolean
}
export interface UpdateTemplateResponse extends TemplateEntity {}
