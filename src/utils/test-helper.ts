import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntityManager, getConnection } from 'typeorm'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { urlencoded, json } from 'express'
import { AuthService } from '../modules/auth/auth.service'
import { UserService } from '../modules/user/user.service'
import { User, UserSignInType } from '../db/entities/User'
import { Role } from '../modules/auth/auth.constant'
import { appConfig } from 'src/config/env-config'

export const truncates = (...tableNames: string[]) => {
  const query = tableNames.map(name => `TRUNCATE ${name} CASCADE;`).join('')
  return getConnection().query(query)
}

export const createTestingApp = (moduleRef: TestingModule): INestApplication => {
  const app = moduleRef.createNestApplication()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ limit: '50mb', extended: true }))
  return app
}

export const createTestingModule = async (...modules) => {
  console.log(
    appConfig.DB_HOST,
    Number(appConfig.DB_PORT),
    appConfig.DB_USERNAME,
    appConfig.DB_PASSWORD,
    appConfig.DB_TEST_NAME,
  )
  return await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: appConfig.DB_HOST,
        port: Number(appConfig.DB_PORT),
        username: appConfig.DB_USERNAME,
        password: appConfig.DB_PASSWORD,
        database: appConfig.DB_TEST_NAME,
        synchronize: false,
        entities: ['src/db/entities/*{.js,.ts}'],
        autoLoadEntities: true,
        logging: true,
      }),
      ...modules,
    ],
  }).compile()
}

export const getToken = (authService: AuthService) => {
  const email = 'mock@test.com'
  const role = Role.ADMIN
  const user = User.create({ role, email })
  const userId = user.id
  const token = `Bearer ${authService.getToken(user)}`

  jest
    .spyOn(UserService.prototype as any, 'getUserWithId')
    .mockImplementationOnce(jest.fn().mockReturnValue(user))

  return { user, userId, token }
}
