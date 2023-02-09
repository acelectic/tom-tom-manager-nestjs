import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EntityManager } from 'typeorm'
import { UserService } from '../user/user.service'
import { AdminChangePasswordParamsDto } from './dto/change-password.dto'
import { User } from '../../db/entities/User'
import bcrypt from 'bcrypt'
import { AdminResetPasswordParamsDto } from './dto/reset-password.dto'
import { AuthService } from '../auth/auth.service'
import { Chance } from 'chance'

@Injectable()
export class AdminService {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  async resetPassword(data: AdminResetPasswordParamsDto, etm: EntityManager) {
    const { email } = data
    await this.authService.validateUserWithEmail(email)

    const newPassword = Chance().string({
      length: 10,
      alpha: true,
      numeric: true,
      symbols: true,
      casing: 'lower',
    })
    const encryptPassword = await bcrypt.hash(newPassword, 10)
    const user = await User.findOneBy({ email })
    user.password = encryptPassword
    await etm.save(user)

    return user
  }

  async adminChangePassword(data: AdminChangePasswordParamsDto, etm: EntityManager) {
    const { email, password } = data
    await this.authService.validateUserWithEmail(email)

    const encryptPassword = await bcrypt.hash(password, 10)
    const user = await User.findOneBy({ email })
    user.password = encryptPassword

    await etm.save(user)
    return user
  }
}
