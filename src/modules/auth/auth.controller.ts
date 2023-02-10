import { Body, Controller, Post, Patch, Res, UseGuards, Get } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SignInEmailDto, UpdateForgotPasswordDto } from './dto/sign-in.dto'
import { SignOutDto } from './dto/sing-out.dto'
import { RegisterEmailParamsDto, RegisterEmailResponseDto } from './dto/register.dto'
import { DataSource } from 'typeorm'
import { Role, cookieKeys, cookieOptions } from './auth.constant'
import { Response } from 'express'
import { pick } from 'lodash'
import { Auth, ReqUser } from './auth.decorator'
import { User } from 'src/db/entities/User'
import { RefreshTokenGuard } from './guard/refresh-token.guard'

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

    const { accessToken, refreshToken, user } = response

    res.cookie(cookieKeys.accessToken, accessToken, cookieOptions)
    res.cookie(cookieKeys.user, user, cookieOptions)
    res.cookie(cookieKeys.refreshToken, refreshToken, cookieOptions)
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
    res.clearCookie(cookieKeys.refreshToken, cookieOptions)
    res.clearCookie(cookieKeys.user, cookieOptions)
    res.send(response)
    res.end()
  }

  @ApiBody({ type: RegisterEmailParamsDto })
  @ApiResponse({ type: RegisterEmailResponseDto })
  @Post('register')
  async registerEmail(
    @Body() body: RegisterEmailParamsDto,
    @Res() res: Response,
    etm = this.dataSource.createEntityManager(),
  ) {
    const response = await this.authService.registerWithEmail(body, Role.USER, etm)
    const { accessToken, refreshToken, user } = response

    res.cookie(cookieKeys.accessToken, accessToken, cookieOptions)
    res.cookie(cookieKeys.refreshToken, refreshToken, cookieOptions)
    res.cookie(
      cookieKeys.user,
      pick(user, ['name', 'email', 'lastSignInAt', 'password', 'balance']),
      cookieOptions,
    )
    res.send(response)
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

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@ReqUser() user: User, etm = this.dataSource.createEntityManager()) {
    const { id: userId, refreshToken } = user
    return this.authService.refreshTokens(userId, refreshToken, etm)
  }
}
