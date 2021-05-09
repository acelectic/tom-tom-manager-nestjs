import { Role, UserEntity } from '../auth/auth-types'

export interface GetUsersResponse {
  users: UserEntity[]
}

export interface GetUserResponse extends UserEntity {}
export interface ChangeRoleParams {
  userId: string
  role: Role
}

export interface UpdateUserParams {
  userId: string
  name: string
  role: Role
  password: string
}
