import dotenv from 'dotenv'
import Knex from 'knex'

dotenv.config()

// export async function create () {
  const db = Knex({
    client: 'pg',
    connection:  {
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      host: process.env.HOSTNAME,
      port: 3306,
      database: process.env.DBNAME
    },
    // `postgres://localhost:5432/lendsqr`,
    
    pool: {
      min: 2,
      max: 10,
    },
    acquireConnectionTimeout: 2000
  })

  // Verify the connection before proceeding
  // try {
  //   await knex.raw('SELECT now()')

  //   return knex
  // } catch (error) {
  //   throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection.')
  // }
// }

export default db