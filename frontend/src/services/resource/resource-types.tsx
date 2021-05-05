export interface ResourceEntity {
  id: string
  ref: number
  name: string
  price: number
}

export interface GetResourcesResponse {
  resources: ResourceEntity[]
}

export interface CreateResourceParams {
  name: string
  price: number
}
export interface CreateResourceResponse extends ResourceEntity {}
