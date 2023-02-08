require('dotenv').config()
import { NestFactory, Reflector, HttpAdapterHost, BaseExceptionFilter } from '@nestjs/core'
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  LogLevel,
  ArgumentsHost,
  Catch,
  NestApplicationOptions,
  VersioningType,
} from '@nestjs/common'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { urlencoded, json, Request } from 'express'
import { DbExeptionFilter } from './db-exeption.filter'
import basicAuth from 'express-basic-auth'
import './initialize'
import { appConfig } from './config/app-config'
import { bullServerAdapter } from './task/bull-board.provider'
import { appVersion } from './utils/helper'
// const sreviceAccount = require('../test-man-savvy-firebase-adminsdk-f2848-982951f18b.json')

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    super.catch(exception, host)
  }
}

console.log({ appConfig })

const whitelistOrigin = [
  'https://tomtom-react.herokuapp.com',
  /\*.herokuapp.com$/,
  'http://localhost:3000',
  /\*.com$/,
]

const loggerProduction: LogLevel[] = ['warn']
const logger: NestApplicationOptions =
  appConfig.LOG_LEVEL === 'debug'
    ? { logger: ['debug'] }
    : appConfig.LOG_LEVEL === 'production'
    ? { logger: loggerProduction }
    : {}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'debug'],
  })

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  })

  app.enableCors({
    origin: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'App-Version'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })

  app.setGlobalPrefix('/api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // disableErrorMessages: true,
      // exceptionFactory: (validationErrors: ValidationError[] = []) => {
      //   validateBadRequest(validationErrors)
      // },
    }),
  )

  app.useGlobalFilters()
  app.useGlobalInterceptors(
    // new ResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  )
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new DbExeptionFilter(), new ExceptionsLoggerFilter(httpAdapter))
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ limit: '50mb', extended: true }))
  const options = new DocumentBuilder()
    .setTitle('TOMTOM API')
    .setDescription('The TOMTOM API description')
    .setVersion(appVersion)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  // bull-board
  bullServerAdapter.setBasePath('/bull-board')
  app.use(
    '/bull-board',
    basicAuth({
      users: {
        admin: appConfig.BULL_BOARD_PASSWORD,
      },
      challenge: true,
    }),
    bullServerAdapter.getRouter(),
  )

  const port = appConfig.PORT
  await app.listen(port, () => {
    console.log(`Nest server (v${appVersion}) listening on port ` + port + '.')
  })
}
bootstrap()
