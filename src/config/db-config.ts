import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { appConfig } from './app-config'

const defaultConfig: PostgresConnectionOptions & TypeOrmModuleOptions = {
  type: 'postgres',
  host: appConfig.DB_HOST,
  port: +appConfig.DB_PORT,
  username: appConfig.DB_USERNAME,
  password: appConfig.DB_PASSWORD,
  schema: appConfig.DB_SCHEMA,
  synchronize: false,
  autoLoadEntities: true,
  logging: appConfig.LOG_LEVEL === 'debug' ? 'all' : false,
}

if (appConfig.DB_HEROKU_URL && !appConfig.PG_LOCAL) {
  const customConfig = {
    url: appConfig.DB_HEROKU_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    synchronize: false,
    // logging: false,
    logging: true,
    // logging: ['log', 'query'],
    // entities: ['dist/db/entities/*{.js,.ts}'],
    migrations: ['dist/db/migrations/*{.js,.ts}'],
    subscribers: ['dist/db/subscriber/**/*{.js,.ts}'],
    uuidExtension: 'pgcrypto',
    cli: {
      migrationsDir: 'db/migrations',
    },
  }

  Object.assign(defaultConfig, customConfig)
  // console.log({ label: "have url", defaultConfig });
} else {
  const customConfig = {
    host: appConfig.DB_HOST,
    port: Number(appConfig.DB_PORT),
    username: appConfig.DB_USERNAME,
    password: appConfig.DB_PASSWORD,
    cli: {
      migrationsDir: 'db/migrations',
    },
    entities: ['dist/db/entities/*{.js,.ts}'],
    migrations: ['dist/db/migrations/*{.js,.ts}'],
    subscribers: ['dist/db/subscriber/**/*{.js,.ts}'],
    synchronize: false,
    logging: true,
    // autoLoadEntities: true,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    uuidExtension: 'pgcrypto',
  }
  Object.assign(defaultConfig, customConfig)

  // console.log({ label: "not have url", defaultConfig });
}

export const dbConfig: {
  default: PostgresConnectionOptions & TypeOrmModuleOptions
  test: PostgresConnectionOptions & TypeOrmModuleOptions
} = {
  default: {
    ...defaultConfig,
    database: appConfig.DB_NAME,
  },
  test: {
    ...defaultConfig,
    database: appConfig.DB_TEST_NAME,
  },
}
console.log({ dbConfig: dbConfig.default })
const AppDataSource = new DataSource({
  ...dbConfig.default,
})

export default AppDataSource
