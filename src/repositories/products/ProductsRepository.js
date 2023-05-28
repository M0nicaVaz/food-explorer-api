const knex = require('../../database/knex');
const DiskStorage = require('../../providers/DiskStorage');

class ProductsRepository {
  async create({ title, description, image, price, type }) {
    const diskStorage = new DiskStorage();
    const imageSaved = await diskStorage.saveFile(image);

    const productId = await knex('products').insert({
      title,
      description,
      image: imageSaved,
      price,
      type,
    });

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
