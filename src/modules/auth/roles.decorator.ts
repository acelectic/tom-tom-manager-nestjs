import { SetMetadata } from '@nestjs/common'
import { Role } from './auth.constant'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

export const Admin = Roles(Role.ADMIN)
export const Manager = Roles(Role.ADMIN, Role.MANAGER)
// export const Customer = Roles(Role.ADMIN, Role.MANAGER, Role.MANAGER)
// export const Viewver = Roles(
//   Role.ADMIN,
//   Role.MANAGER,
//   Role.MANAGER,
//   Role.VIEVWER,
// )
