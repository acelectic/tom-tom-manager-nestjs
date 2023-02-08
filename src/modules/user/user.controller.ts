import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { ReqUser, Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import { User } from '../../db/entities/User'
import { DataSource, EntityManager } from 'typeorm'
import { ChangeRoleDto, GetUsersParamsDto, UpdateUserDto } from './dto/user-params.dto'

@ApiTags('users')
@Controller('users')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService, private readonly dataSource: DataSource) {}

  @Get()
  async getUsers(@Query() queryParams: GetUsersParamsDto) {
    return this.userService.getUsers(queryParams)
  }

  @Get('/current-user')
  async getCurrentUser(@ReqUser() user: User) {
    return this.userService.getUser(user.id)
  }

  @Get('/:userId')
  async getUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userService.getUser(userId)
  }

  @Patch('/:userId/change-role')
  async changeRole(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() param: ChangeRoleDto,
    etm: EntityManager,
  ) {
    return await this.userService.changeRole(userId, param.role, etm)
  }

  @Patch('/:userId/update')
  async updateUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() param: UpdateUserDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return await this.userService.updateUser(userId, param, etm)
  }
}
