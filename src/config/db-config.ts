import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { appConfig } from './app-config'
type IDataSourceConfig = DataSourceOptions | PostgresConnectionOptions

const defaultConfig: IDataSourceConfig = {
  type: 'postgres',
  host: appConfig.DB_HOST,
  port: +appConfig.DB_PORT,
  username: appConfig.DB_USERNAME,
  password: appConfig.DB_PASSWORD,
  schema: appConfig.DB_SCHEMA,
  synchronize: false,
  logging: appConfig.LOG_LEVEL === 'debug' ? 'all' : false,
}

if (appConfig.DB_HEROKU_URL && !appConfig.PG_LOCAL) {
  const customConfig: IDataSourceConfig = {
    type: 'postgres',
    url: appConfig.DB_HEROKU_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    synchronize: false,
    logging: true,
    entities: ['dist/db/entities/*{.js,.ts}'],
    migrations: ['dist/db/migrations/*{.js,.ts}'],
    subscribers: ['dist/db/subscriber/**/*{.js,.ts}'],
    uuidExtension: 'pgcrypto',
  }

  Object.assign(defaultConfig, customConfig)
  // console.log({ label: "have url", defaultConfig });
} else {
  const customConfig: IDataSourceConfig = {
    type: 'postgres',
    host: appConfig.DB_HOST,
    port: Number(appConfig.DB_PORT),
    username: appConfig.DB_USERNAME,
    password: appConfig.DB_PASSWORD,
    entities: ['dist/db/entities/*{.js,.ts}'],
    migrations: ['dist/db/migrations/*{.js,.ts}'],
    subscribers: ['dist/db/subscriber/**/*{.js,.ts}'],
    synchronize: false,
    logging: true,
    uuidExtension: 'pgcrypto',
  }
  Object.assign(defaultConfig, customConfig)
  // console.log({ label: "not have url", defaultConfig });
}

export const dbConfig: {
  default: IDataSourceConfig
  test: IDataSourceConfig
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

const AppDataSource = new DataSource({
  ...dbConfig.default,
})

export default AppDataSource
