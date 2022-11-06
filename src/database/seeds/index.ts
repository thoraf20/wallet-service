import Knex from 'knex'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
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