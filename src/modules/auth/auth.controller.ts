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
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { Role } from './auth.constant'
import { debugLog } from 'src/utils/helper'
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor'

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('request-otp')
  // async getOtp(@Query() body: getOtpDto) {
  //   return await this.authService.getOtp(body)
  // }

  // @ApiBody({ type: SignInGoogleDto })
  // @Post("google")
  // @Transaction()
  // async signInGoogle(
  //   @Body() body: SignInGoogleDto,
  //   @TransactionManager() etm: EntityManager
  // ) {
  //   return await this.authService.singWithGoogle(body, etm);
  // }

  // @ApiBody({ type: SignInFacebookDto })
  // @Post("facebook")
  // @Transaction()
  // async signInFacebook(
  //   @Body() body: SignInFacebookDto,
  //   @TransactionManager() etm: EntityManager
  // ) {
  //   return await this.authService.signWithFacebook(body, etm);
  // }

  @ApiBody({ type: SignInEmailDto })
  @Post('sign-in')
  @Transaction()
  async signInEmail(@Body() body: SignInEmailDto, @TransactionManager() etm: EntityManager) {
    return await this.authService.signWithEmail(body, etm)
  }

  @ApiBody({ type: SignOutDto })
  @Post('sign-out')
  @Transaction()
  async signOut(@Body() body: SignOutDto, @TransactionManager() etm: EntityManager) {
    return await this.authService.signOut(body, etm)
  }

  @ApiBody({ type: ParamsRegisterEmailDto })
  @Post('register')
  @Transaction()
  @SerializeOptions({
    strategy: 'exposeAll',
  })
  async registerEmail(
    @Body() body: ParamsRegisterEmailDto,
    @TransactionManager() etm: EntityManager,
  ) {
    debugLog({ ...body })
    return await this.authService.registerWithEmail(body, Role.USER, etm)
  }

  @ApiBody({ type: UpdateForgotPasswordDto })
  @Patch('/update-password')
  @Transaction()
  async updateForgotPassword(
    @Body() body: UpdateForgotPasswordDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return await this.authService.updateForgotPassword(body, etm)
  }
}
