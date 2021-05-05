import { HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EntityManager } from 'typeorm'
import { UserService } from '../user/user.service'
import { TokenData } from './auth.interface'
import { getOtpDto } from './dto/get-otp.dto'
import {
  SignInEmailDto,
  SignInDto,
  SignInGoogleDto,
  SignInFacebookDto,
  UpdateForgotPasswordDto,
  SignInAppleDto,
  SignInEmailInternalDto,
} from './dto/sign-in.dto'
import { SignOutDto } from './dto/sing-out.dto'
import { User } from '../../db/entities/User'
import { api } from '../../utils/api'
import { validateError, validateForbidden } from '../../utils/response-error'
import {
  ResponseGoogleSignIn,
  ResponseFacebookSignIn,
  ResponseFacebookDetail,
  ParamSignInBase,
  ResponseAppleDetail,
} from './auth.interface'
import { UserSignInType } from '../../db/entities/User'
import { ParamsCreateUserSignIn } from '../user/user.interface'
import qs from 'qs'
import { VerifyEmailDto, VerifyMobilelDto, ParamsRegisterEmailDto } from './dto/register.dto'
import bcrypt from 'bcrypt'
import { Role } from './auth.constant'
import { debugLog } from 'src/utils/helper'
import { Chance } from 'chance'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  // async singWithGoogle(data: SignInGoogleDto, etm: EntityManager) {
  //   const { authToken, deviceToken } = data
  //   const paramsSignInGoogle = { id_token: authToken }

  //   const response = await this.sendSignInGoogle(paramsSignInGoogle)
  //   const { sub: accountId, email } = response.data

  //   const paramsSignInBase: ParamSignInBase = {
  //     email,
  //     // accountId,
  //     // typeSignIn: UserSignInType.GOOGLE,
  //     deviceToken,
  //   }
  //   return await this.signIn(paramsSignInBase, etm)
  // }

  // async signWithFacebook(data: SignInFacebookDto, etm: EntityManager) {
  //   const accessToken = process.env.FACEBOOK_APP_ACCESS_TOKEN
  //   const { authToken, deviceToken } = data
  //   const paramsSignInFacebook = {
  //     input_token: authToken,
  //     access_token: accessToken,
  //   }

  //   const responseSignIn = await this.sendSignInFacebook(paramsSignInFacebook)
  //   const { userId: accountId } = responseSignIn.data.data
  //   const responseGetDetail = await this.sendFacebookDetail(accountId, authToken)

  //   const { email } = responseGetDetail.data
  //   const paramsSignInBase: ParamSignInBase = {
  //     email,
  //     // accountId,
  //     // typeSignIn: UserSignInType.FACEBOOK,
  //     deviceToken,
  //   }
  //   return await this.signIn(paramsSignInBase, etm)
  // }

  async registerWithEmail(data: ParamsRegisterEmailDto, role: Role, etm: EntityManager) {
    await this.verifyEmail(data)
    await this.validateSignInWithEmail(data)

    const { email, password, name = Chance().name({ middle: false, full: true }) } = data
    console.log({ email, password, name })
    const encryptPassword = await bcrypt.hash(password, 10)

    const paramsSignInBase: ParamSignInBase = {
      email,
      // accountId,
      // typeSignIn,
      name,
      password: encryptPassword,
      role,
    }

    return await this.signIn(paramsSignInBase, etm)
  }

  async signWithEmail(data: SignInEmailDto, etm: EntityManager) {
    const { email, password } = data
    await this.validateSignInWithEmail(data)
    const user = await User.findOne({ email })
    const paramsSignInBase: ParamSignInBase = {
      email,
      password,
      role: Role.USER,
    }
    return await this.signIn(paramsSignInBase, etm)
  }

  // async signInInternalWithEmail(
  //   data: SignInEmailInternalDto,
  //   etm: EntityManager
  // ) {
  //   const { email, password } = data;
  //   await this.validateSignInWithInternalEmail(data);

  //   const { EMAIL } = UserSignInType;
  //   const user = await User.findOne({ email, typeSignIn: EMAIL });

  //   const paramsSignInBase: ParamSignInBase = {
  //     email,
  //     accountId: user.accountId,
  //     typeSignIn: EMAIL,
  //     password: password,
  //   };
  //   return await this.signIn(paramsSignInBase, etm);
  // }

  // private async decodeAppleToken<ResponseAppleDetail>(idToken: string) {
  //   return this.jwtService.decode(idToken) as ResponseAppleDetail;
  // }

  async generateClientSecret() {
    const teamId = process.env.APPLE_TEAM_ID
    const clientId = process.env.APPLE_CLIENT_ID
    const keyId = process.env.APPLE_KEY_ID
    const keyFile = `private/AuthKey_${keyId}.p8`
  }

  private async generateAccountId() {
    return Math.random()
      .toString(36)
      .substring(2)
  }

  private async signIn(data: ParamSignInBase, etm: EntityManager) {
    // await this.validateOtp(data.token, data.pin)

    const { email, password, name, role } = data
    let user = await User.findOne({ email })

    if (!user) {
      const params: ParamsCreateUserSignIn = {
        email,
        password,
        role,
        name,
      }
      user = await this.userService.createUserSignIn(params, etm)
    }
    user.lastSignInAt = new Date()
    if (!user.password) user.password = password
    await etm.save(user)
    const newUser = await User.findOne(user.id)
    return {
      accessToken: this.getToken(newUser),
      user: newUser,
    }
  }

  async signOut(data: SignOutDto, etm: EntityManager) {
    return { message: 'success' }
  }

  getToken(user: User) {
    const payload: TokenData = {
      id: user.id,
      role: user.role,
    }
    return this.jwtService.sign(payload)
  }

  // async getOtp(data: getOtpDto) {
  //   const paramsSendOtpRequest = qs.stringify({
  //     key: process.env.API_OTP_KEY,
  //     secret: process.env.API_OTP_SECRET,
  //     msisdn: data.mobileNo,
  //   })

  //   return await this.sendOtp('request', paramsSendOtpRequest)
  // }

  async verifyEmail(params: VerifyEmailDto) {
    const { email } = params
    const user = await User.findOne({ email })

    return { isEmailExist: user ? true : false }
  }

  async updateForgotPassword(data: UpdateForgotPasswordDto, etm: EntityManager) {
    const { email, password } = data
    await this.validateUserWithEmail(email)

    const encryptPassword = await bcrypt.hash(password, 10)
    const user = await User.findOne({ email })
    user.password = encryptPassword

    await etm.save(user)
    return user
  }

  private async validateUserWithEmail(email) {
    const user = await User.findOne({ email })
    if (!user) {
      validateError('User not found')
    }
  }

  private async validateSignInWithEmail(data: SignInEmailDto) {
    const { email, password } = data

    const user = await User.createQueryBuilder('user')
      .where({
        email,
      })
      .addSelect('password')
      .getOne()
    if (!user) {
      validateError('User not found')
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password || '')
    if (password && user.password && !isPasswordMatching) {
      validateError('Password not match')
    }
  }

  // private async sendSignInGoogle(params) {
  //   try {
  //     const url = 'https://oauth2.googleapis.com/tokeninfo'
  //     return await api.auth.get<ResponseGoogleSignIn>(url, params)
  //   } catch (error) {
  //     console.log(error)
  //     validateError('422-036')
  //   }
  // }

  // private async sendSignInFacebook(params) {
  //   try {
  //     const url = 'https://graph.facebook.com/debug_token'
  //     return await api.auth.get<ResponseFacebookSignIn>(url, params)
  //   } catch (error) {
  //     console.log(error)
  //     validateError('422-037')
  //   }
  // }

  // private async sendFacebookDetail(accountId: string, accessToken: string) {
  //   try {
  //     const params = {
  //       fields: 'id,name,email,first_name,last_name',
  //       access_token: accessToken,
  //     }
  //     const url = `https://graph.facebook.com/${accountId}?`
  //     return await api.auth.get<ResponseFacebookDetail>(url, params)
  //   } catch (error) {
  //     console.log(error)
  //     validateError('422-037')
  //   }
  // }

  // private async sendOtp(url: string, params: string) {
  //   try {
  //     return await api.otp.post(url, params)
  //   } catch (error) {
  //     console.log(error)
  //     validateError('422-021')
  //   }
  // }
}
