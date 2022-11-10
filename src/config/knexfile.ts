
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
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
};


export =  dbSetup 
