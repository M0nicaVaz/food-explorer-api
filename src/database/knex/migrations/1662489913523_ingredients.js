exports.up = (knex) =>
  knex.schema.createTable('ingredients', (table) => {
    table.increments('id');
    table.integer('product_id').references('id').inTable('products');
    table.text('name').notNullable();
    table.text('image').nullable();
  });

exports.down = (knex) => knex.schema.dropTable('ingredients');
