import { Knex } from "knex";

 exports.up = function (knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamps(true, true);
    }
  );
};

exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable("users");
};

exports.config = { transaction: false };
