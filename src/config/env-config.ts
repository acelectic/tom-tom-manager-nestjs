import Joi, { SchemaMap } from 'joi'

const NODE_ENVS = ['development', 'production', 'test', 'provision'] as const
const LOG_LEVELS = ['debug', 'sql', 'production'] as const
export const appConfig = {
  NODE_ENV: process.env.NODE_ENV as typeof NODE_ENVS[number],
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_NAME: process.env.DB_NAME,
  DB_TEST_NAME: process.env.DB_TEST_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATABASE_URL: process.env.DATABASE_URL,
  PG_LOCAL: process.env.PG_LOCAL === 'true',
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  LOG_LEVEL: process.env.LOG_LEVEL as typeof LOG_LEVELS[number],
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
  PORT: Joi.number().default(8626),
  JWT_SECRET_KEY: Joi.string().default('secret_key'),
  DB_HOST: Joi.string().default('dev_service_postgres'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('admin'),
  DB_PASSWORD: Joi.string().default('admin'),
  DB_NAME: Joi.string().default('tom_tom'),
  DB_TEST_NAME: Joi.string().default('tom_tom_test'),
  DATABASE_URL: Joi.string().optional(),
  PG_LOCAL: Joi.boolean().valid(true, false),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  BULL_BOARD_PASSWORD: Joi.string().required(),
  FIREBASE_STORAGE_BUCKET: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
}

export const validationEnvSchema = Joi.object(envSchema)
