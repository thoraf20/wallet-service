import dotenv from 'dotenv'
// import Url from 'url-parse'
dotenv.config()

// const CLEARDB_DATABASE_URL = new Url(process.env.CLEARDB_DATABASE_URL);

export const dbSetup = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts'
    }
  },

  test: {
    client: 'mysql',
    connection: {
      database: process.env.TEST_DB_NAME,
      user:     process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      port: process.env.TEST_DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts'
    }
  },
};