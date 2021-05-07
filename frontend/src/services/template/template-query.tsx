import { useMutation, useQuery, useQueryClient } from 'react-query'
import { api } from '../../utils/api'
import {
  CreateTemplateParams,
  CreateTemplateResponse,
  GetTemplateResponse,
  UpdateTemplateParams,
  UpdateTemplateResponse,
} from './template-types'

export const TEMPLATE_URL = 'templates'

export const useGetTemplates = () => {
  return useQuery([TEMPLATE_URL], async () => {
    const { data } = await api.tomtom.get<GetTemplateResponse>(TEMPLATE_URL)
    return data.templates
  })
}
export const useCreateTemplate = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: CreateTemplateParams) => {
      const { resourceIds, isActive } = params
      const { data } = await api.tomtom.post<CreateTemplateResponse>(
        TEMPLATE_URL,
        {
          resourceIds,
          isActive,
        },
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TEMPLATE_URL])
      },
    },
  )
}
export const useUpdateTemplate = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: UpdateTemplateParams) => {
      const { templateId, resourceIds, isActive } = params
      const { data } = await api.tomtom.post<UpdateTemplateResponse>(
        `${TEMPLATE_URL}/${templateId}`,
        {
          resourceIds,
          isActive,
        },
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TEMPLATE_URL])
      },
    },
  )
}
