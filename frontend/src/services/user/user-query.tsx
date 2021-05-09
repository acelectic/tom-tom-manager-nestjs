import { useMutation, useQuery, useQueryClient } from 'react-query'
import { api } from '../../utils/api'
import { numberWithCommas } from '../../utils/helper'
import { SIGN_IN } from '../auth/auth-query'
import { SigninParams, SigninResponse } from '../auth/auth-types'
import {
  ChangeRoleParams,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserParams,
} from './user-types'

export const USER_URL = 'users'
export const CHANGE_ROLE_URL = `change-role`
export const UPDATE_USER_URL = `update`

export const useGetUsers = () => {
  return useQuery([USER_URL], async () => {
    const { data } = await api.tomtom.get<GetUsersResponse>(USER_URL)
    return (data.users.map(d => ({
      ...d,
      balance: numberWithCommas(d.balance),
    })) as unknown) as GetUsersResponse['users']
  })
}

export const useGetUser = (userId: string) => {
  return useQuery([USER_URL, { userId }], async () => {
    const { data } = await api.tomtom.get<GetUserResponse>(
      `${USER_URL}/${userId}`,
    )
    return data
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: SigninParams) => {
      const { data } = await api.tomtom.post<SigninResponse>(SIGN_IN, params)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([USER_URL])
      },
    },
  )
}

export const useChangeRole = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [USER_URL, CHANGE_ROLE_URL],
    async (params: ChangeRoleParams) => {
      const { userId, role } = params
      if (!userId) return
      const { data } = await api.tomtom.patch(
        `${USER_URL}/${userId}/${CHANGE_ROLE_URL}`,
        {
          role,
        },
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([USER_URL])
      },
    },
  )
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [USER_URL, UPDATE_USER_URL],
    async (params: UpdateUserParams) => {
      const { userId, name, password, role } = params
      if (!userId) return
      const { data } = await api.tomtom.patch(
        `${USER_URL}/${userId}/${UPDATE_USER_URL}`,
        {
          name,
          password,
          role,
        },
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([USER_URL])
      },
    },
  )
}
