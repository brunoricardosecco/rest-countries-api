const { Region } = require('../models');

class RegionController {
  async create(request, response) {
    try {
      const {
        name,
      } = request.body;

      const region = await Region.create({
        name,
      });

      return response.status(201).json({ region });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao processar requisição' });
    }
  }

  async findAll(request, response) {
    try {
      const regions = await Region.findAll({
        order: [['name', 'ASC']],
      });

      return response.status(200).json({ regions });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro ao processar requisição' });
    }
  }
}

module.exports = new RegionController();
