const { User, Address } = require('../models');
const { encryptPassword } = require('../helpers');

class UserController {
  async create(request, response) {
    try {
      const {
        name,
        email,
        password,
      } = request.body;

      const passwordHashed = await encryptPassword(password);

      const user = await User.create({
        name,
        email,
        password: passwordHashed,
      });

      return response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({ message: 'Erro no cadastro de Usuário' });
    }
  }

  async authenticate(request, response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      // User not found
      if (!user) {
        return response.status(401).json({ message: 'Usuário não encontrado' });
      }

      // Incorrect password
      if (!(await user.checkPassword(password))) {
        return response.status(401).json({ message: 'Senha ou email incorreto' });
      }

      return response.status(200).json({ user, token: user.generateToken() });
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Erro na autenticação do usuário' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findByPk(Number(id), {
        subQuery: false,
        underscored: true,
        include: [
          {
            model: Address,
            as: 'addresses',
          },
        ],
      });

      if (!user) {
        return response.status(401).json({ message: 'Usuário não encontrado' });
      }

      return response.status(200).json(user);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: 'Erro na busca do usuário' });
    }
  }
}

module.exports = new UserController();
