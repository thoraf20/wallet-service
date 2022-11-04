import dotenv from 'dotenv'
import { attachPaginate } from 'knex-paginate'
import { dbSetup } from '../knexconfig'

dotenv.config()

const knexConfig = {
  client: 'mysql',
  connection: dbSetup.test,
  userParams: {
    userParam1: '451'
  },
};

attachPaginate()

export default knexConfig;

// {
//   host : '127.0.0.1',
//   port : 3306,
//   user : 'your_database_user',
//   password : 'your_database_password',
//   database : 'myapp_test'
// },