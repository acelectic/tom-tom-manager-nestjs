"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const typeorm_1 = require("typeorm");
const app_config_1 = require("./app-config");
const defaultConfig = {
    type: 'postgres',
    host: app_config_1.appConfig.DB_HOST,
    port: +app_config_1.appConfig.DB_PORT,
    username: app_config_1.appConfig.DB_USERNAME,
    password: app_config_1.appConfig.DB_PASSWORD,
    schema: app_config_1.appConfig.DB_SCHEMA,
    synchronize: false,
    autoLoadEntities: true,
    logging: app_config_1.appConfig.LOG_LEVEL === 'debug' ? 'all' : false,
};
if (app_config_1.appConfig.DB_HEROKU_URL && !app_config_1.appConfig.PG_LOCAL) {
    const customConfig = {
        url: app_config_1.appConfig.DB_HEROKU_URL,
        ssl: {
            rejectUnauthorized: false,
        },
        synchronize: false,
        logging: true,
        migrations: ['dist/db/migrations/*{.js,.ts}'],
        subscribers: ['dist/db/subscriber/**/*{.js,.ts}'],
        uuidExtension: 'pgcrypto',
        cli: {
            migrationsDir: 'db/migrations',
        },
    };
    Object.assign(defaultConfig, customConfig);
}
else {
    const customConfig = {
        host: app_config_1.appConfig.DB_HOST,
        port: Number(app_config_1.appConfig.DB_PORT),
        username: app_config_1.appConfig.DB_USERNAME,
        password: app_config_1.appConfig.DB_PASSWORD,
        cli: {
            migrationsDir: 'db/migrations',
        },
        entities: ['dist/db/entities/*{.js,.ts}'],
        migrations: ['dist/db/migrations/*{.js,.ts}'],
        subscribers: ['dist/db/subscriber/**/*{.js,.ts}'],
        synchronize: false,
        logging: true,
        uuidExtension: 'pgcrypto',
    };
    Object.assign(defaultConfig, customConfig);
}
exports.dbConfig = {
    default: Object.assign(Object.assign({}, defaultConfig), { database: app_config_1.appConfig.DB_NAME }),
    test: Object.assign(Object.assign({}, defaultConfig), { database: app_config_1.appConfig.DB_TEST_NAME }),
};
const AppDataSource = new typeorm_1.DataSource(Object.assign({}, exports.dbConfig.default));
exports.default = AppDataSource;
//# sourceMappingURL=db-config.js.map