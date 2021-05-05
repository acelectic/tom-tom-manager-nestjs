import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { VersionMiddleware } from './utils/middlewares/version.middleware'
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
import Joi from 'joi'
import { ResouceModule } from './modules/resource/resouce.modules'
import { TransactionModule } from './modules/transaction/transaction.modules'
import { PaymentModule } from './modules/payment/payment.modules'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(8626),
        JWT_SECRET_KEY: Joi.string().default('secret_key'),
        DB_HOST: Joi.string().default('dev_service_postgres'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('admin'),
        DB_PASSWORD: Joi.string().default('admin'),
        DB_NAME: Joi.string().default('tom_tom'),
        DB_TEST_NAME: Joi.string().default('tom_tom_test'),
        DATABASE_URL: Joi.string().required(),
        PG_LOCAL: Joi.boolean()
          .valid(true, false)
          .default(1),
        LOG_LEVEL: Joi.string()
          .valid('debug', 'production')
          .default('debug'),
        // REDIS_HOST: Joi.string().required(),
        // REDIS_PORT: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
    UserModule,
    ConsoleModule,
    AppConsoleModule,
    AuthModule,
    TaskModule,
    ResouceModule,
    TransactionModule,
    PaymentModule,
    LoggerModule.forRoot({
      pinoHttp: {
        // level:
        //   process.env.LOG_LEVEL === 'debug'
        //     ? 'debug'
        //     : process.env.LOG_LEVEL === 'production'
        //     ? 'info'
        //     : 'debug',
        // level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // prettyPrint: process.env.NODE_ENV !== 'production',
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
export class AppModule implements NestModule {
  configure(condumer: MiddlewareConsumer) {
    condumer.apply(VersionMiddleware).forRoutes('/')
  }
}
