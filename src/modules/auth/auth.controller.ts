import { Body, Controller, Post, Patch, SerializeOptions, Res } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SignInEmailDto, UpdateForgotPasswordDto } from './dto/sign-in.dto'
import { SignOutDto } from './dto/sing-out.dto'
import { ParamsRegisterEmailDto } from './dto/register.dto'
import { DataSource } from 'typeorm'
import { Role, cookieKeys, cookieOptions } from './auth.constant'
import { debugLog } from 'src/utils/helper'
import { Response } from 'express'
import { pick } from 'lodash'
import { Auth, ReqUser } from './auth.decorator'
import { User } from 'src/db/entities/User'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly dataSource: DataSource) {}

  @ApiBody({ type: SignInEmailDto })
  @Post('sign-in')
  async signInEmail(
    @Res() res: Response,
    @Body() body: SignInEmailDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    const response = await this.authService.signWithEmail(body, etm)

    const { accessToken, user } = response

    res.cookie(cookieKeys.accessToken, accessToken, cookieOptions)
    res.cookie(cookieKeys.user, user, cookieOptions)
    res.send(response)
    res.end()
  }

  @ApiBody({ type: SignOutDto })
  @Post('sign-out')
  async signOut(
    @Body() body: SignOutDto,
    @Res() res: Response,
    etm = this.dataSource.createEntityManager(),
  ) {
    const response = await this.authService.signOut(body, etm)

    res.clearCookie(cookieKeys.accessToken, cookieOptions)
    res.clearCookie(cookieKeys.user, cookieOptions)
    res.send(response)
    res.end()
  }

  @ApiBody({ type: ParamsRegisterEmailDto })
  @Post('register')
  @SerializeOptions({
    strategy: 'exposeAll',
  })
  async registerEmail(
    @Body() body: ParamsRegisterEmailDto,
    @Res() res: Response,
    etm = this.dataSource.createEntityManager(),
  ) {
    debugLog({ ...body })
    const response = await this.authService.registerWithEmail(body, Role.USER, etm)
    const { accessToken, user } = response

    res.cookie(cookieKeys.accessToken, accessToken, cookieOptions)
    res.cookie(
      cookieKeys.user,
      pick(user, ['name', 'email', 'lastSignInAt', 'password', 'balance']),
      cookieOptions,
    )
    res.send(response)
    res.end()
  }

  @ApiBody({ type: UpdateForgotPasswordDto })
  @Auth()
  @Patch('/update-password')
  async updateForgotPassword(
    @Body() body: UpdateForgotPasswordDto,
    @ReqUser() user: User,
    etm = this.dataSource.createEntityManager(),
  ) {
    return await this.authService.updateForgotPassword(body, user.email, etm)
  }
}
