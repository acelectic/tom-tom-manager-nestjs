import { HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { httpError } from '../../../utils/response-error'
import { UserService } from '../../user/user.service'
import { TokenData } from '../auth.interface'
import { appConfig } from 'src/config/app-config'
import { Request } from 'express'
import { cookieKeys } from '../auth.constant'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: appConfig.JWT_REFRESH_SECRET_KEY,
      passReqToCallback: true,
    })
  }

  async validate(payload: TokenData): Promise<any> {
    const user = await this.userService.getUserWithId(payload.id)
    if (!user) {
      httpError(HttpStatus.UNAUTHORIZED)
    }
    return user
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies?.[cookieKeys.refreshToken]?.length) {
      return req.cookies[cookieKeys.refreshToken]
    }
    return null
  }
}
