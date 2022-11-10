import { Knex } from "knex";

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable("wallets", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("wallet_code").notNullable();
    table.string("wallet_pin").defaultTo(null);
    table.decimal("balance", 12, 2).defaultTo(0);
    table.timestamps(true, true);
  });
};


exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable("wallets");
};

exports.config = { transaction: false };
