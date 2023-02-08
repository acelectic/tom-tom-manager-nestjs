import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { AppConsoleModule } from './modules/app-console/app-console.module'
import { ConsoleModule } from 'nestjs-console'
import { AuthModule } from './modules/auth/auth.modules'
import { ScheduleModule } from '@nestjs/schedule'
import './initialize'
import { BullModule } from '@nestjs/bull'
import { TaskModule } from './task/task.module'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
import { ResourceModule } from './modules/resource/resource.modules'
import { TransactionModule } from './modules/transaction/transaction.modules'
import { PaymentModule } from './modules/payment/payment.modules'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { TemplateModule } from './modules/template/template.modules'
import { appConfig, validationEnvSchema } from './config/app-config'
import { dbConfig } from './config/db-config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationEnvSchema,
    }),
    TypeOrmModule.forRoot({
      ...dbConfig.default,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: appConfig.REDIS_HOST,
        port: Number(appConfig.REDIS_PORT),
        password: appConfig.REDIS_PASSWORD,
      },
    }),
    UserModule,
    ConsoleModule,
    AppConsoleModule,
    AuthModule,
    TaskModule,
    ResourceModule,
    TransactionModule,
    PaymentModule,
    TemplateModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'silent',
        redact: {
          paths: ['req.body.password', 'req.headers.authorization', 'req.headers.cookie'],
          censor: '********',
        },
        serializers: {
          req(req) {
            req.body = req.raw.body
            return req
          },
        },
      },

      exclude: [{ method: RequestMethod.GET, path: '/api/v1/health' }],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
