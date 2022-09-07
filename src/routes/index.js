const { Router } = require('express');

const usersRouter = require('./users.routes');
const ordersRouter = require('./orders.routes');
const productsRouter = require('./products.routes');
const ingredientsRouter = require('./ingredients.routes');

const routes = Router();

routes.use('/users', usersRouter);
// routes.use('/orders', ordersRouter);
// routes.use('/products', productsRouter);
// routes.use('/ingredients', ingredientsRouter);

module.exports = routes;
