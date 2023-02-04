import { HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { httpError } from '../../utils/response-error'
import { UserService } from '../user/user.service'
import { TokenData } from './auth.interface'
import { appConfig } from 'src/config/env-config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.JWT_SECRET_KEY,
    })
  }

  async validate(payload: TokenData): Promise<any> {
    const user = await this.userService.getUserWithId(payload.id)
    if (!user) {
      httpError(HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}
