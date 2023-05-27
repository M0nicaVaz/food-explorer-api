const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const ProductsController = require('../controllers/ProductsController');
const uploadConfig = require('../configs/upload');

const productsRoutes = Router();
const productsController = new ProductsController();

const upload = multer(uploadConfig.MULTER);

productsRoutes.use('/', upload.single('image'));
productsRoutes.post('/', productsController.create);

module.exports = productsRoutes;
