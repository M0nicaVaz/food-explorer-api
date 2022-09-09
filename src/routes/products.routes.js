const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const ProductsController = require('../controllers/ProductsController');

const UPLOADS_FOLDER = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_FOLDER,
  }),
});

// const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.use('/', upload.single('image'));
productsRoutes.post('/', productsController.create);

module.exports = productsRoutes;
