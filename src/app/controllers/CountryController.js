const { Country, Region } = require('../models');

class CountryController {
  async create(request, response) {
    try {
      const {
        name,
        population,
        regionId,
        flag,
      } = request.body;

      const country = await Country.create({
        name,
        population,
        id_region: regionId,
        flag,
      });

      const foundCountry = await Country.findByPk(country.id, {
        include: [
          {
            model: Region,
            as: 'region',
            attributes: ['id', 'name'],
          },
        ],
      });

      return response.status(201).json({ country: foundCountry });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro ao processar requisição' });
    }
  }

  async findAll(request, response) {
    try {
      const countries = await Country.findAll({
        order: [['name', 'ASC']],
        include: [
          {
            model: Region,
            as: 'region',
            attributes: ['id', 'name'],
          },
        ],
      });

      return response.status(200).json({ countries });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Erro ao processar requisição' });
    }
  }
}

module.exports = new CountryController();
