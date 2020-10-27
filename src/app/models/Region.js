module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  Region.associate = (models) => {
    Region.hasMany(models.Country, {
      as: 'countries',
      foreignKey: 'country_id',
      targetKey: 'id',
    });
  };

  return Region;
};
