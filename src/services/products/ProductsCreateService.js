const AppError = require('../../utils/AppError');

class ProductsCreateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ title, image, ingredients, description, price, type }) {
    const productAlreadyExists = await this.productsRepository.findByTitle(
      title
    );

    if (productAlreadyExists) {
      throw new AppError('Este prato já está cadastrado.');
    }
    const productCreated = await this.productsRepository.create({
      title,
      image,
      description,
      price,
      ingredients,
      type,
    });
    return productCreated;
  }
}

module.exports = ProductsCreateService;
