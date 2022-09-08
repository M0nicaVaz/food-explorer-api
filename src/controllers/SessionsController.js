const UserRepository = require('../repositories/users/UserRepository');
const SessionCreateService = require('../services/session/SessionCreateService');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const sessionCreateService = new SessionCreateService(userRepository);

    const { user, token } = await sessionCreateService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
