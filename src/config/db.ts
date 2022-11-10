import dotenv from 'dotenv'
import Knex from 'knex'
import dbSetup from './knexfile'
import { attachPaginate } from 'knex-paginate'

dotenv.config()

const db = Knex(dbSetup.development)

attachPaginate()

export default db