import { Connection, getConnection } from 'typeorm'
import pgPromise from 'pg-promise'

export const bulk = async (data: any, column: any, table: string) => {
  const connection: Connection = getConnection()
  const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: connection.options.database,
  }

  const timeStart = new Date()
  const config = `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
  const pgp = pgPromise()
  const db = pgp(config)
  const cs = new pgp.helpers.ColumnSet(column, { table })
  const insert = await pgp.helpers.insert(data, cs)

  await db
    .none(insert)
    .then(() => {
      const timeEnd = new Date()
      console.log(`Success bulk insert value to table ${table}.`)
      //@ts-ignore
      console.log(`Use time = ${(timeEnd - timeStart) / 1000} secs.`)
    })
    .catch(error => {
      console.log(`Fail bulk insert value to table ${table}, beacase of ${error}`)
    })
}
