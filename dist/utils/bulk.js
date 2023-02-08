"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulk = void 0;
const typeorm_1 = require("typeorm");
const pg_promise_1 = __importDefault(require("pg-promise"));
const env_config_1 = require("../config/env-config");
exports.bulk = async (data, column, table) => {
    const connection = typeorm_1.getConnection();
    const dbConfig = {
        host: env_config_1.appConfig.DB_HOST,
        port: env_config_1.appConfig.DB_PORT,
        username: env_config_1.appConfig.DB_USERNAME,
        password: env_config_1.appConfig.DB_PASSWORD,
        database: connection.options.database,
    };
    const timeStart = new Date();
    const config = `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
    const pgp = pg_promise_1.default();
    const db = pgp(config);
    const cs = new pgp.helpers.ColumnSet(column, { table });
    const insert = await pgp.helpers.insert(data, cs);
    await db
        .none(insert)
        .then(() => {
        const timeEnd = new Date();
        console.log(`Success bulk insert value to table ${table}.`);
        console.log(`Use time = ${(timeEnd - timeStart) / 1000} secs.`);
    })
        .catch(error => {
        console.log(`Fail bulk insert value to table ${table}, beacase of ${error}`);
    });
};
//# sourceMappingURL=bulk.js.map