import Joi, { SchemaMap } from 'joi'

const NODE_ENVS = ['development', 'production', 'test', 'provision'] as const
const LOG_LEVELS = ['debug', 'sql', 'production'] as const
export const appConfig = {
  NODE_ENV: process.env.NODE_ENV as (typeof NODE_ENVS)[number],
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
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
  ENABLE_TASKS: process.env.ENABLE_TASKS === 'true',
} as const

const validatePgLocalOnly = (validateSchema: Joi.SchemaLike): Joi.AlternativesSchema =>
  Joi.alternatives().conditional('PG_LOCAL', {
    is: 'true',
    then: validateSchema,
  })

const envSchema: Required<SchemaMap<typeof appConfig>> = {
  NODE_ENV: Joi.string().valid(...NODE_ENVS),
  LOG_LEVEL: Joi.string().valid(...LOG_LEVELS),
  PORT: Joi.number().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_REFRESH_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
  DB_HOST: validatePgLocalOnly(Joi.string().required()),
  DB_PORT: validatePgLocalOnly(Joi.number().required()),
  DB_USERNAME: validatePgLocalOnly(Joi.string().required()),
  DB_PASSWORD: validatePgLocalOnly(Joi.string().required()),
  DB_NAME: validatePgLocalOnly(Joi.string().required()),
  DB_SCHEMA: Joi.string().required(),
  DB_TEST_NAME: Joi.string().required(),
  DB_HEROKU_URL: Joi.string().optional(),
  PG_LOCAL: Joi.boolean().required().valid(true, false),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  BULL_BOARD_PASSWORD: Joi.string().required(),
  FIREBASE_STORAGE_BUCKET: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  ENABLE_TASKS: Joi.boolean().optional(),
}

export const validationEnvSchema = Joi.object(envSchema)
