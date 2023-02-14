import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EntityManager } from 'typeorm'
import { UserService } from '../user/user.service'
import { AccessTokenJwtPayload, RefreshTokenJwtPayload } from './auth.interface'
import { SignInEmailDto, UpdateForgotPasswordDto } from './dto/sign-in.dto'
import { SignOutDto } from './dto/sing-out.dto'
import { User } from '../../db/entities/User'
import { validateError } from '../../utils/response-error'
import { ParamSignInBase } from './auth.interface'
import { ParamsCreateUserSignIn } from '../user/user.interface'
import { RegisterEmailParamsDto, RegisterEmailResponseDto } from './dto/register.dto'
import bcrypt from 'bcrypt'
import { Role } from './auth.constant'
import { Chance } from 'chance'
import { TransformInstanceToInstance } from 'class-transformer'
import { appConfig } from 'src/config/app-config'
import { PerformanceObserver, performance } from 'perf_hooks'
import { ForgotPasswordParamsDto, ForgotPasswordResponseDto } from './dto/forgot-password.dto'

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries())

  performance.clearMarks()
  performance.clearMeasures()
  obs.disconnect()
})
obs.observe({ entryTypes: ['function'] })

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @TransformInstanceToInstance()
  async registerWithEmail(
    data: RegisterEmailParamsDto,
    role: Role,
    etm: EntityManager,
  ): Promise<RegisterEmailResponseDto> {
    await Promise.all([this.validateSignInWithEmail(data)])

    const { email, password, name = Chance().name({ middle: false, full: true }) } = data
    console.log({ email, password, name })
    const encryptPassword = await bcrypt.hash(password, 10)

    const paramsSignInBase: ParamSignInBase = {
      email,
      name,
      password: encryptPassword,
      role,
    }

    return this.signIn(paramsSignInBase, etm)
  }

  async signWithEmail(data: SignInEmailDto, etm: EntityManager) {
    const { email, password } = data
    await this.validateSignInWithEmail(data)
    const user = await User.findOneBy({ email })
    const paramsSignInBase: ParamSignInBase = {
      email,
      password,
      role: Role.USER,
    }
    return await this.signIn(paramsSignInBase, etm)
  }

  private async signIn(
    data: ParamSignInBase,
    etm: EntityManager,
  ): Promise<RegisterEmailResponseDto> {
    const { email, password, name, role } = data
    const response = new RegisterEmailResponseDto()
    let user = await User.findOneBy({ email })

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
    if (!user?.password) user.password = password

    const { accessToken, refreshToken } = await this.getTokens(user)
    await this.updateRefreshToken(user, refreshToken, etm)
    await etm.save(user)

    response.accessToken = accessToken
    response.refreshToken = refreshToken
    response.user = user
    return response
  }

  async signOut(data: SignOutDto, etm: EntityManager) {
    return { message: 'success' }
  }

  async updatePassword(data: UpdateForgotPasswordDto, email: string, etm: EntityManager) {
    const { oldPassword, newPassword } = data
    await this.validateUserWithEmail(email)
    await this.validateSignInWithEmail({ email, password: oldPassword })

    const encryptPassword = await this.hashData(newPassword)
    const user = await User.findOneBy({ email })
    user.password = encryptPassword

    await etm.save(user)
    return user
  }

  async refreshTokens(userId: string, refreshToken: string, etm: EntityManager) {
    const user = await User.findOneBy({ id: userId })

    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied')

    const compareToken = performance.timerify(() => bcrypt.compare(refreshToken, user.refreshToken))
    const refreshTokenMatches = await compareToken()
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')

    const getTokens = performance.timerify(() => this.getTokens(user))
    const tokens = await getTokens()

    const updateToken = performance.timerify(() =>
      this.updateRefreshToken(user, tokens.refreshToken, etm),
    )
    await updateToken()
    return tokens
  }

  async forgotPassword(
    params: ForgotPasswordParamsDto,
    etm: EntityManager,
  ): Promise<ForgotPasswordResponseDto> {
    const { email } = params
    await this.validateUserWithEmail(email)

    const newPassword = Chance().string({
      length: 10,
      alpha: true,
      numeric: true,
    })
    const encryptPassword = await bcrypt.hash(newPassword, 10)
    const user = await User.findOneBy({ email })
    user.password = encryptPassword
    await etm.save(user)

    return {
      newPassword,
    }
  }

  // private
  async validateUserWithEmail(email) {
    const user = await User.findOneBy({ email })
    if (!user) {
      validateError('User not found')
    }
  }

  async validateSignInWithEmail(data: SignInEmailDto) {
    const { email, password } = data

    const user = await User.createQueryBuilder('user')
      .where({
        email,
      })
      .addSelect('password')
      .getOne()

    const isPasswordMatching = await bcrypt.compare(password, user?.password || '')
    if (user && password && user?.password && !isPasswordMatching) {
      validateError('Password not match')
    }
  }

  async getTokens(user: User) {
    const { id: userId, email, role } = user
    const accessTokenPayload: AccessTokenJwtPayload = {
      id: userId,
      email,
      role,
    }
    const refreshTokenPayload: RefreshTokenJwtPayload = {
      id: userId,
      email,
      role,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(accessTokenPayload, {
        secret: appConfig.JWT_SECRET_KEY,
        expiresIn: appConfig.JWT_EXPIRES_IN,
      }),
      this.jwtService.sign(refreshTokenPayload, {
        secret: appConfig.JWT_REFRESH_SECRET_KEY,
        expiresIn: appConfig.JWT_REFRESH_EXPIRES_IN,
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async updateRefreshToken(user: User, refreshToken: string, etm: EntityManager) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    user.refreshToken = hashedRefreshToken
    await etm.save(user)
    return hashedRefreshToken
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10)
  }
}
