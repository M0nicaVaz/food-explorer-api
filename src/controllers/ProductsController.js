const ProductsRepository = require('../repositories/products/ProductsRepository');
const ProductsCreateService = require('../services/products/ProductsCreateService');

class ProductsController {
  async create(req, res) {
    const { title, image, description, price, type } = JSON.parse(
      req.body.data
    );

    const productsRepository = new ProductsRepository();
    const productsCreateService = new ProductsCreateService(productsRepository);

    await productsCreateService.execute({
      title,
      description,
      image,
      price,
      type,
    });

    return res.status(201).json();
  }
}

module.exports = ProductsController;
