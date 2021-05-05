// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const envConfig = require(__dirname + "/../config/config.json")[env];

const defaultConfig = {
  name: 'default',
  type: 'postgres',
  entities: ['dist/db/entities/*{.js,.ts}'],
}

// console.log({
//   DATABASE_URL: process.env.DATABASE_URL,
//   PG_LOCAL: process.env.PG_LOCAL,
// });
if (process.env.DATABASE_URL && process.env.PG_LOCAL !== 'true') {
  const customConfig = {
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    synchronize: false,
    logging: false,
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
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    cli: {
      migrationsDir: 'db/migrations',
    },
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

// const config = [
//   {
//     ...defaultConfig,
//     database: process.env.DB_NAME,
//   },
//   {
//     ...defaultConfig,
//     name: "test",
//     database: process.env.DB_TEST_NAME,
//   },
// ];

const typeormConfig = {
  ...defaultConfig,
  database: process.env.DB_NAME,
}

// console.log({ typeormConfig })

module.exports = typeormConfig
