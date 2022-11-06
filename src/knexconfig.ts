import dotenv from 'dotenv'
import parseDBUrl from 'url-parse'
dotenv.config()

const config = parseDBUrl(process.env.DATABASE_URL as string);

export const dbSetup = {

  development: {
    client: 'pg',
    connection: {
      user: config.username,
      password: config.password,
      host: config.hostname,
      port: Number(config.port),
      database: 'lendsqr_dev',
      ssl: false,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      // directory: "./migrations",
    },
    // seeds: {
    //   directory: './seeds' 
    // }
  },

  // test: {
  //   client: 'mysql',
  //   connection: {
  //     database: process.env.TEST_DB_NAME,
  //     user:     process.env.TEST_DB_USER,
  //     password: process.env.TEST_DB_PASSWORD,
  //     port: process.env.TEST_DB_PORT
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //     extension: 'ts'
  //   }
  // },
};