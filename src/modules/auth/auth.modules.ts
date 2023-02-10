import { Module } from '@nestjs/common'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccessTokenStrategy } from './strategy/access-token-strategy'
import { appConfig } from 'src/config/app-config'

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
