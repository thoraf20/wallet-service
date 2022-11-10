import bcrypt from 'bcryptjs'
import { User } from '../interface/user.interface'
import db from '../../config/db'

export default class UserService {

  static async createUser(userData: User) {
    const {first_name, last_name, email, password } = userData
    const hashPassword = bcrypt.hashSync(password, 10)

    const user = await db.insert({first_name, last_name, email, password: hashPassword })
    .returning('id')
      .into('users')
      .then(function (id) {
        return id
      });

    // var id = knex.insert(
    //   {
    //     first_name:firstName,
    //     last_name:lastName,
    //     email:email,
    //     phone_number:phoneNumber
    //   })
    //   .returning('id')
    //   .into('person')
    return user
  }

  static async findUserByEmail(email: string) {
    const user = await db.select('*').from('users').where('email', email).first()
    return user
  }

  static async getProfile(email: string) {
    const user = await this.findUserByEmail(email)
    delete user.password
    return user
  }
}