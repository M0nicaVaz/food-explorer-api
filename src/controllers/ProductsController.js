const ProductsRepository = require('../repositories/products/ProductsRepository');
const ProductsCreateService = require('../services/products/ProductsCreateService');
const knex = require('../database/knex');
class ProductsController {
  async create(req, res) {
    const { title, image, description, price, type } = JSON.parse(
      req.body.data
    );

    const productsRepository = new ProductsRepository();
    const productsCreateService = new ProductsCreateService(productsRepository);

    const data = await productsCreateService.execute({
      title,
      description,
      image,
      price,
      type,
    });

    return res.status(201).json(data);
  }

  async index(request, response) {
    const products = await knex('products').select();

    return response.json(products);
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();

    return response.json({
      ...product,
    });
  }
}

module.exports = ProductsController;
