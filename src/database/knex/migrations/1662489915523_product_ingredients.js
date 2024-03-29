exports.up = (knex) =>
  knex.schema.createTable('product_ingredients', (table) => {
    table.increments('id');
    table.integer('product_id').references('id').inTable('products');
    table.integer('ingredient_id').references('id').inTable('ingredients');
  });

exports.down = (knex) => knex.schema.dropTable('orderItem');
