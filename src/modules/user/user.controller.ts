import { Body, Controller, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { ReqUser, Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import { User } from '../../db/entities/User'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { ChangeRoleDto, UpdateUserDto } from './dto/user-params.dto'

@ApiTags('users')
@Controller('v1/users')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers()
  }

  @Get('/current-user')
  async getCurrentUser(@ReqUser() user: User) {
    return this.userService.getUser(user.id)
  }

  @Patch('/:userId/change-role')
  @Transaction()
  async changeRole(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() param: ChangeRoleDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return await this.userService.changeRole(userId, param.role, etm)
  }

  @Patch('/:userId/update')
  @Transaction()
  async updateUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() param: UpdateUserDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return await this.userService.updateUser(userId, param, etm)
  }
}
