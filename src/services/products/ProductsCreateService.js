const AppError = require('../../utils/AppError');

class ProductsCreateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ title, description, image, price, type }) {
    const productAlreadyExists = await this.productsRepository.findByTitle(
      title
    );

    console.log(productAlreadyExists);
    if (productAlreadyExists) {
      throw new AppError('Este prato já está cadastrado.');
    }

    const productCreated = await this.productsRepository.create({
      title,
      description,
      image,
      price,
      type,
    });

    return productCreated;
  }
}

module.exports = ProductsCreateService;
