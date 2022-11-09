import Knex from 'knex'
import db from '../../database/db'


exports.seed = function(db , Promise) {
  // Deletes ALL existing entries
  return db('users').del()
    .then(function () {
      // Inserts seed entries
      return db('users').insert([
        {
          id: 1,
          email: '',
          password: '',
          first_name: '',
          last_name: ''
        }
      ]);
    });
};