import Url from 'url-parse';
import dotenv from 'dotenv';

dotenv.config()

const CLEARDB_DATABASE_URL = new Url(process.env.CLEARDB_DATABASE_URL as string);

 const dbSetup = {
  development: {
    client: 'pg',
    connection: {
      database: 'lendsqr_dev',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_user_ migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'mysql',
    connection: {
      database: CLEARDB_DATABASE_URL.pathname.substring(1),
      user:  CLEARDB_DATABASE_URL.username,
      password: CLEARDB_DATABASE_URL.password,
      host: CLEARDB_DATABASE_URL.host,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_users_migrations'
    }
  }
};


export =  dbSetup 
