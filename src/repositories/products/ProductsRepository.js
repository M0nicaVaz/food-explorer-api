const knex = require('../../database/knex');
const DiskStorage = require('../../providers/DiskStorage');

class ProductsRepository {
  async create({ title, description, ingredients, image, price, type }) {
    const diskStorage = new DiskStorage();
    const imageSaved = await diskStorage.saveFile(image);

    const productId = await knex('products').insert({
      title,
      description,
      image: imageSaved,
      price,
      type,
    });

    if (ingredients.length > 0) {
      const ingredientsInsert = ingredients.map((name) => {
        return {
          product_id: productId[0],
          name,
        };
      });
      await knex('ingredients').insert(ingredientsInsert);
    }

    return { id: productId };
  }

  async findById(id) {
    const productId = await knex('products').where({ id }).first();

    return productId;
  }

  async findByTitle(title) {
    const product = await knex('products').where({ title }).first();

    return product;
  }
}

module.exports = ProductsRepository;
