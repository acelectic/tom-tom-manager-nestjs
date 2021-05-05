// const USER_RELATION = [
//   'position',
//   'position.department',
//   'position.department.jobFunction',
//   'idpPlanningsApproves',
// ] as const
// export type GetUserIncludesRelation = typeof USER_RELATION[number][]
// export type GetUserParams = {
//   userId: string
//   relations?: GetUserIncludesRelation
// }
export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEVWER = 'viewer',
}

export interface UserEntity {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  email: string
  lastSignInAt: string
  name: string
  role: Role
  balance: number
}
export type SigninParams = {
  email: string
  password: string
  name?: string
}

export type SigninResponse = {
  accessToken: string
  user: UserEntity
}
