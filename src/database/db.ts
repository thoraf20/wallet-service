import dotenv from 'dotenv'
import Knex from 'knex'
import { dbSetup } from './knexconfig'
import { attachPaginate } from 'knex-paginate'

dotenv.config()

const db = Knex(dbSetup.development)

attachPaginate()

export default db