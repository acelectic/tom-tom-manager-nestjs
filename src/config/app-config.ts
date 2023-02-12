import Joi, { SchemaMap } from 'joi'

const NODE_ENVS = ['development', 'production', 'test', 'provision'] as const
const LOG_LEVELS = ['debug', 'sql', 'production'] as const
export const appConfig = {
  NODE_ENV: process.env.NODE_ENV as (typeof NODE_ENVS)[number],
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  DB_NAME: process.env.DB_NAME,
  DB_TEST_NAME: process.env.DB_TEST_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
  DB_SCHEMA: process.env.DB_SCHEMA,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HEROKU_URL: process.env.DB_HEROKU_URL,
  PG_LOCAL: process.env.PG_LOCAL === 'true',
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  LOG_LEVEL: process.env.LOG_LEVEL as (typeof LOG_LEVELS)[number],
  BULL_BOARD_PASSWORD: process.env.BULL_BOARD_PASSWORD,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  PORT: +process.env.PORT,
} as const

const envSchema: Required<SchemaMap<typeof appConfig>> = {
  NODE_ENV: Joi.string()
    .valid(...NODE_ENVS)
    .default('development'),
  LOG_LEVEL: Joi.string().valid(...LOG_LEVELS),
  PORT: Joi.number().required().default(8626),
  JWT_SECRET_KEY: Joi.string().required().default('secret_key'),
  JWT_REFRESH_SECRET_KEY: Joi.string().required().default('refresh_secret_key'),
  DB_HOST: Joi.alternatives().conditional('PG_LOCAL', {
    is: 'true',
    then: Joi.string().required().default('dev_service_postgres'),
  }),
  DB_PORT: Joi.alternatives().conditional('PG_LOCAL', {
    is: 'true',
    then: Joi.number().required().default(5432),
  }),
  DB_USERNAME: Joi.alternatives().conditional('PG_LOCAL', {
    is: 'true',
    then: Joi.string().required().default('admin'),
  }),
  DB_PASSWORD: Joi.alternatives().conditional('PG_LOCAL', {
    is: 'true',
    then: Joi.string().required().default('admin'),
  }),
  DB_NAME: Joi.alternatives().conditional('PG_LOCAL', {
    is: 'true',
    then: Joi.string().required().default('tom_tom'),
  }),
  DB_SCHEMA: Joi.string().required().default('tom_tom'),
  DB_TEST_NAME: Joi.string().required().default('tom_tom_test'),
  DB_HEROKU_URL: Joi.string().optional(),
  PG_LOCAL: Joi.boolean().required().valid(true, false),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  BULL_BOARD_PASSWORD: Joi.string().required(),
  FIREBASE_STORAGE_BUCKET: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
}

export const validationEnvSchema = Joi.object(envSchema)