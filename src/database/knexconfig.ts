import dotenv from 'dotenv'
import parseDBUrl from 'url-parse'
dotenv.config()

const config = parseDBUrl(process.env.DATABASE_URL as string);

export const dbSetup = {

  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'postgres',
      // config.password as string,
      host: 'localhost',
      port: 5432,
      database: 'lendsqr_dev',
      ssl: false,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './src/database/migrations/1_users.ts',
    },
    seeds: {
      directory: './src/database/seeds/index' 
    }
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