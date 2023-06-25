const ProductsRepository = require('../repositories/products/ProductsRepository');
const ProductsCreateService = require('../services/products/ProductsCreateService');
const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage');
class ProductsController {
  async update(req, res) {
    const { title, image, description, price, type, ingredients } = JSON.parse(
      req.body.data
    );
    const { id } = req.params;

    if (title && title.length > 0) {
      await knex('products').update({ title }).where({ id });
    }

    if (description && description.length > 0) {
      await knex('products').update({ description }).where({ id });
    }

    if (price && price.length > 0) {
      await knex('products').update({ price }).where({ id });
    }

    if (type && type.length > 0) {
      await knex('products').update({ type }).where({ id });
    }

    const product = await knex('products').where({ id }).first();

    if (req.file && image && product.image) {
      const imageFileName = req.file.filename;
      const diskStorage = new DiskStorage();
      await diskStorage.deleteFile(product.image);

      const imageSaved = await diskStorage.saveFile(imageFileName);
      await knex('products').update({ image: imageSaved }).where({ id });
    }

    if (ingredients && ingredients.length > 0) {
      await knex('ingredients').where({ product_id: id }).del();

      const ingredientsInsert = ingredients.map((name) => {
        return {
          product_id: id,
          name,
        };
      });
      await knex('ingredients').insert(ingredientsInsert);
    }

    return res.json({
      ...product,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex('products').where({ id }).delete();

    return res.json();
  }

  async create(req, res) {
    const { title, image, description, ingredients, price, type } = JSON.parse(
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
      ingredients,
    });

    return res.status(201).json(data);
  }

  async index(request, response) {
    const products = await knex('products').select();
    const ingredients = await knex('ingredients').select();

    const productsWithIngredients = products.map((product) => {
      const productIngredients = ingredients.filter(
        (ingredient) => ingredient.product_id === product.id
      );
      return { ...product, ingredients: productIngredients };
    });

    return response.json(productsWithIngredients);
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();
    const ingredients = await knex('ingredients')
      .where({ product_id: id })
      .orderBy('name');

    return response.json({
      ...product,
      ingredients,
    });
  }
}

module.exports = ProductsController;
