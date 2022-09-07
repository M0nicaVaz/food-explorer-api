const UserRepository = require('../repositories/users/UserRepository');
const UserCreateService = require('../services/users/UserCreateService');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }
}

module.exports = UsersController;
