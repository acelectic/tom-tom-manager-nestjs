"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationEnvSchema = exports.appConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const NODE_ENVS = ['development', 'production', 'test', 'provision'];
const LOG_LEVELS = ['debug', 'sql', 'production'];
exports.appConfig = {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
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
    LOG_LEVEL: process.env.LOG_LEVEL,
    BULL_BOARD_PASSWORD: process.env.BULL_BOARD_PASSWORD,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    PORT: +process.env.PORT,
};
const envSchema = {
    NODE_ENV: joi_1.default.string()
        .valid(...NODE_ENVS)
        .default('development'),
    LOG_LEVEL: joi_1.default.string().valid(...LOG_LEVELS),
    PORT: joi_1.default.number().default(8626),
    JWT_SECRET_KEY: joi_1.default.string().default('secret_key'),
    DB_HOST: joi_1.default.string().default('dev_service_postgres'),
    DB_PORT: joi_1.default.number().default(5432),
    DB_USERNAME: joi_1.default.string().default('admin'),
    DB_PASSWORD: joi_1.default.string().default('admin'),
    DB_NAME: joi_1.default.string().default('tom_tom'),
    DB_SCHEMA: joi_1.default.string().default('tom_tom'),
    DB_TEST_NAME: joi_1.default.string().default('tom_tom_test'),
    DB_HEROKU_URL: joi_1.default.string().optional(),
    PG_LOCAL: joi_1.default.boolean().valid(true, false),
    REDIS_HOST: joi_1.default.string().required(),
    REDIS_PORT: joi_1.default.number().required(),
    REDIS_PASSWORD: joi_1.default.string().required(),
    BULL_BOARD_PASSWORD: joi_1.default.string().required(),
    FIREBASE_STORAGE_BUCKET: joi_1.default.string().required(),
    FIREBASE_PROJECT_ID: joi_1.default.string().required(),
};
exports.validationEnvSchema = joi_1.default.object(envSchema);
//# sourceMappingURL=app-config.js.map