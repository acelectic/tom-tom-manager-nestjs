import { Injectable } from '@nestjs/common'
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
import { VerifyEmailDto, ParamsRegisterEmailDto } from './dto/register.dto'
import bcrypt from 'bcrypt'
import { Role } from './auth.constant'
import { Chance } from 'chance'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

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

  private async generateAccountId() {
    return Math.random()
      .toString(36)
      .substring(2)
  }

  private async signIn(data: ParamSignInBase, etm: EntityManager) {
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
    if (!user?.password) user.password = password
    await etm.save(user)
    const newUser = await etm.findOne(User, user.id)
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

    const isPasswordMatching = await bcrypt.compare(password, user?.password || '')
    if (user && password && user?.password && !isPasswordMatching) {
      validateError('Password not match')
    }
  }
}
