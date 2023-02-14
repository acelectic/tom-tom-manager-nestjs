import { CacheModule, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { AppConsoleModule } from './modules/app-console/app-console.module'
import { ConsoleModule } from 'nestjs-console'
import { AuthModule } from './modules/auth/auth.modules'
import { ScheduleModule } from '@nestjs/schedule'
import './initialize'
import { BullModule } from '@nestjs/bullmq'
// import { BullModule } from '@nestjs/bull'
import { TaskModule } from './task/task.module'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
import { ResourceModule } from './modules/resource/resource.modules'
import { TransactionModule } from './modules/transaction/transaction.modules'
import { PaymentModule } from './modules/payment/payment.modules'
import { TemplateModule } from './modules/template/template.modules'
import { appConfig, validationEnvSchema } from './config/app-config'
import { dbConfig } from './config/db-config'
import { AdminModule } from './modules/admin/admin.modules'
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationEnvSchema,
    }),
    TypeOrmModule.forRoot({
      ...dbConfig.default,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    // BullModule.forRoot({
    //   connection: {
    //     // host: appConfig.REDIS_HOST,
    //     // port: Number(appConfig.REDIS_PORT),
    //     // password: appConfig.REDIS_PASSWORD,
    //     // host: 'redis://:p5706d5cf10dcf6b4df70cf33bed1f6b38c43cce472d4dad56298a067f3d24a1b@ec2-44-198-93-109.compute-1.amazonaws.com:26680',
    //     host: 'redis://:p5706d5cf10dcf6b4df70cf33bed1f6b38c43cce472d4dad56298a067f3d24a1b@ec2-44-198-93-109.compute-1.amazonaws.com:26680',
    //     // host: 'ec2-44-198-93-109.compute-1.amazonaws.com',
    //     // port: 26680,
    //     // password: 'p5706d5cf10dcf6b4df70cf33bed1f6b38c43cce472d4dad56298a067f3d24a1b',
    //   },
    //   defaultJobOptions: {
    //     removeOnComplete: 1000,
    //   },
    // }),
    LoggerModule.forRoot({
      pinoHttp: {
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
    ConsoleModule,

    // common
    AppConsoleModule,
    TaskModule,

    // feature
    AdminModule,
    AuthModule,
    PaymentModule,
    ResourceModule,
    TemplateModule,
    TransactionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
