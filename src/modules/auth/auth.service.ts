import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EntityManager } from 'typeorm'
import { UserService } from '../user/user.service'
import { TokenData } from './auth.interface'
import { SignInEmailDto, UpdateForgotPasswordDto } from './dto/sign-in.dto'
import { SignOutDto } from './dto/sing-out.dto'
import { User } from '../../db/entities/User'
import { validateError } from '../../utils/response-error'
import { ParamSignInBase } from './auth.interface'
import { ParamsCreateUserSignIn } from '../user/user.interface'
import {
  VerifyEmailDto,
  RegisterEmailParamsDto,
  RegisterEmailResponseDto,
} from './dto/register.dto'
import bcrypt from 'bcrypt'
import { Role } from './auth.constant'
import { Chance } from 'chance'
import { TransformInstanceToInstance } from 'class-transformer'
import { appConfig } from 'src/config/app-config'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @TransformInstanceToInstance()
  async registerWithEmail(
    data: RegisterEmailParamsDto,
    role: Role,
    etm: EntityManager,
  ): Promise<RegisterEmailResponseDto> {
    await this.verifyEmail(data)
    await this.validateSignInWithEmail(data)

    const response = new RegisterEmailResponseDto()

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

  private async generateAccountId() {
    return Math.random().toString(36).substring(2)
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
    await etm.save(user)
    const newUser = await etm.findOneBy(User, {
      id: user.id,
    })

    const { accessToken, refreshToken } = await this.getTokens(newUser)
    const hashedRefreshToken = await this.updateRefreshToken(user.id, refreshToken, etm)

    response.accessToken = accessToken
    response.refreshToken = refreshToken
    response.user = newUser
    return response
  }

  async signOut(data: SignOutDto, etm: EntityManager) {
    return { message: 'success' }
  }

  async verifyEmail(params: VerifyEmailDto) {
    const { email } = params
    const user = await User.findOneBy({ email })

    return { isEmailExist: user ? true : false }
  }

  async updateForgotPassword(data: UpdateForgotPasswordDto, email: string, etm: EntityManager) {
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
    const refreshTokenMatches = await await bcrypt.compare(user.refreshToken, refreshToken)
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')
    const tokens = await this.getTokens(user)
    await this.updateRefreshToken(user.id, tokens.refreshToken, etm)
    return tokens
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
    const { id: userId, email: username } = user

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: appConfig.JWT_SECRET_KEY,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: appConfig.JWT_REFRESH_SECRET_KEY,
          expiresIn: '7d',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string, etm: EntityManager) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await etm.update(
      User,
      {
        id: userId,
      },
      {
        refreshToken: hashedRefreshToken,
      },
    )

    return hashedRefreshToken
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 16)
  }
}
