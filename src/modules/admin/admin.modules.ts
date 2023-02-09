import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { AuthModule } from '../auth/auth.modules'
import { JwtModule } from '@nestjs/jwt'
import { appConfig } from 'src/config/app-config'

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: appConfig.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
