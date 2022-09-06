exports.up = (knex) =>
  knex.schema.createTable('orderItem', (table) => {
    table.increments('id');
    table.integer('order_id').references('id').inTable('orders');
    table.integer('product_id').references('id').inTable('products');
    table.integer('quantity').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('orderItem');
