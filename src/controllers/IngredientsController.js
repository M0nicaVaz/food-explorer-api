const {
  IngredientsRepository,
} = require('../repositories/ingredients/IngredientsRepository');
const {
  IngredientCreateService,
} = require('../services/ingredients/IngredientCreateService');

module.exports = { IngredientsController };
class IngredientsController {
  async create(req, res) {
    const { name } = JSON.parse(req.body.data);
    const imageFilename = req.file.filename;

    const repository = new IngredientsRepository();
    const ingredientCreateService = new IngredientCreateService(repository);

    await ingredientCreateService.execute({
      name,
      image: imageFilename,
    });

    return res.status(201).json();
  }
}

module.exports = IngredientsController;
