const { Router } = require('express');

const OrdersController = require('../controllers/UsersController');

// const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post('/');

module.exports = ordersController;
