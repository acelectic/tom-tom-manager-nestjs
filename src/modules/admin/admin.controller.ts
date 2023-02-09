import { Body, Controller, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AdminService } from './admin.service'
import {
  AdminChangePasswordParamsDto,
  AdminChangePasswordResponseDto,
} from './dto/change-password.dto'
import { DataSource } from 'typeorm'
import { User } from 'src/db/entities/User'
import {
  AdminResetPasswordParamsDto,
  AdminResetPasswordResponseDto,
} from './dto/reset-password.dto'
import { Admin, Auth, ReqUser } from '../auth/auth.decorator'

@Auth()
@Admin()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly dataSource: DataSource,
  ) {}
  @ApiBody({ type: AdminResetPasswordParamsDto })
  @ApiResponse({
    type: AdminResetPasswordResponseDto,
  })
  @Post('/reset-password')
  async resetPassword(
    @Body() body: AdminResetPasswordParamsDto,
    @ReqUser() user: User,
    etm = this.dataSource.createEntityManager(),
  ) {
    return await this.adminService.resetPassword(body, etm)
  }

  @ApiBody({ type: AdminChangePasswordParamsDto })
  @ApiResponse({
    type: AdminChangePasswordResponseDto,
  })
  @Post('/admin-change-password')
  async adminChangePassword(
    @Body() body: AdminChangePasswordParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return await this.adminService.adminChangePassword(body, etm)
  }
}
