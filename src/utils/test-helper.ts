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
    process.env.DB_HOST,
    Number(process.env.DB_PORT),
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    process.env.DB_TEST_NAME,
  )
  return await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST_NAME,
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
