import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Header,
  UseInterceptors,
  SerializeOptions,
  Req,
  Res,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import {
  SignInGoogleDto,
  SignInFacebookDto,
  SignInAppleDto,
  SignInEmailDto,
  UpdateForgotPasswordDto,
} from './dto/sign-in.dto'
import { SignOutDto } from './dto/sing-out.dto'
import { getOtpDto } from './dto/get-otp.dto'
import { VerifyEmailDto, VerifyMobilelDto, ParamsRegisterEmailDto } from './dto/register.dto'
import { EntityManager, DataSource } from 'typeorm'
import { Role, cookieKeys, cookieOptions } from './auth.constant'
import { debugLog } from 'src/utils/helper'
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor'
import { CookieOptions, Request, Response } from 'express'
import { pick, pickBy } from 'lodash'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly dataSource: DataSource) {}

  // @Get('request-otp')
  // async getOtp(@Query() body: getOtpDto) {
  //   return await this.authService.getOtp(body)
  // }

  // @ApiBody({ type: SignInGoogleDto })
  // @Post("google")
  // async signInGoogle(
  //   @Body() body: SignInGoogleDto,
  //   etm = this.dataSource.createEntityManager()
  // ) {
  //   return await this.authService.singWithGoogle(body, etm);
  // }

  // @ApiBody({ type: SignInFacebookDto })
  // @Post("facebook")
  // async signInFacebook(
  //   @Body() body: SignInFacebookDto,
  //   etm = this.dataSource.createEntityManager()
  // ) {
  //   return await this.authService.signWithFacebook(body, etm);
  // }

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
  @Patch('/update-password')
  async updateForgotPassword(
    @Body() body: UpdateForgotPasswordDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return await this.authService.updateForgotPassword(body, etm)
  }
}
