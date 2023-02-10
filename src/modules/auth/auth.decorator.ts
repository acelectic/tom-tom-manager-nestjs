import {
  applyDecorators,
  createParamDecorator,
  UseGuards,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AccessTokenGuard } from './guard/access-token.guard'
import { RolesGuard } from './guard/role.guard'
import { Role } from './auth.constant'

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)

export const Auth = (...roles: string[]) => {
  return applyDecorators(Roles(...roles), UseGuards(AccessTokenGuard, RolesGuard), ApiBearerAuth())
}

export const Admin = () => {
  return Auth(Role.ADMIN)
}

export const Manager = () => {
  return Auth(Role.ADMIN, Role.MANAGER)
}

export const Viewer = () => {
  return Auth(Role.ADMIN, Role.MANAGER, Role.VIEWER)
}

export const ReqUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
