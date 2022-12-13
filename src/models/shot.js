const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* this.belongsToMany(models.Player, {
        through: 'PlayerShot',
        foreignKey: 'shotId',
      }); */
      this.hasMany(models.Player, {
        foreignKey: 'shot_1',
        as: 'shot1',
      });
      this.hasMany(models.Player, {
        foreignKey: 'shot_2',
        as: 'shot2',
      });
      this.hasMany(models.Player, {
        foreignKey: 'shot_3',
        as: 'shot3',
      });
    }
  }
  Shot.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Shot',
  });
  return Shot;
};
