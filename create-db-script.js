require('dotenv').config()
const { Client } = module.require('pg')
const adminCred = {
  user: process.env.DB_ADMIN_USERNAME,
  password: process.env.DB_ADMIN_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
}

console.log({
  adminCred,
})
async function createDb(config) {
  const { database } = config
  if (!database) return
  const client = new Client(adminCred)
  await client.connect()
  const result = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${config.database}');`,
  )
  if (result.rowCount <= 0) {
    await client.query(`CREATE DATABASE ${config.database};`)
    await client.end()
    // const client2 = new Client({
    //   ...adminCred,
    //   database: config.database
    // })
    // await client2.connect()
    // await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

    // const r = await client2.query(
    //   `SELECT * FROM pg_catalog.pg_roles WHERE rolname = '${config.user}'`,
    // )
    // if (r.rowCount <= 0) {
    //   await client2.query(
    //     `CREATE ROLE ${config.user} LOGIN PASSWORD '${config.password}';`,
    //   )
    //   await client2.query(
    //     `GRANT ALL PRIVILEGES ON DATABASE ${config.database} TO ${config.user}`,
    //   )
    // }
    // await client2.end()
    console.log(`${config.database} db created`)
  } else {
    console.log(`${config.database} db already exist`)
  }
}
const defaultDbCred = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}
async function createAllDb() {
  try {
    await createDb(defaultDbCred)
    await createDb({
      ...defaultDbCred,
      database: process.env.DB_TEST_NAME,
    })
  } catch (error) {
    console.log({
      error,
    })
  }
}
createAllDb()
