exports.up = function(knex) {
  /** criando uma tabela */
  return knex.schema.createTable("unit", function(table) {
    table.primary().increments();
    table
      .string("name")
      .unique()
      .notNullable();
    table
      .number("status_id")
      .unsigned()
      .notNullable();
    table
      .foreign("status_id")
      .references("id")
      .inTable("status");
  });
};

exports.down = function(knex) {};
