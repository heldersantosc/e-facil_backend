exports.up = function(knex) {
  return knex.schema.createTable("status", function(table) {
    table.primary().increments();
    table
      .string("name")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {};
