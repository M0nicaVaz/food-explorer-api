const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class ProductImageController {
  async update(request, response) {
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFilename);
    product.image = filename;

    await knex('users').update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
