import { useMutation, useQuery, useQueryClient } from 'react-query'
import { api } from '../../utils/api'
import {
  CreateResourceParams,
  CreateResourceResponse,
  GetResourcesResponse,
} from './resource-types'

export const RESOURCE_URL = 'resources'

export const useGetResources = () => {
  return useQuery([RESOURCE_URL], async () => {
    const { data } = await api.tomtom.get<GetResourcesResponse>(RESOURCE_URL)
    return data.resources.map(({ ref, ...rest }) => ({
      ...rest,
      ref: ref.toString().padStart(6, '0'),
    }))
  })
}
export const useCreateResource = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [RESOURCE_URL],
    async (params: CreateResourceParams) => {
      const { name, price } = params
      const { data } = await api.tomtom.post<CreateResourceResponse>(
        RESOURCE_URL,
        {
          name: name,
          price: Number(price),
        },
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([RESOURCE_URL])
      },
    },
  )
}
