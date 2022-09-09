exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments('id');
    table.text('title').notNullable();
    table.text('description').nullable();
    table.text('image').nullable();
    table.integer('price').notNullable();
    table.text('type').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('products');
