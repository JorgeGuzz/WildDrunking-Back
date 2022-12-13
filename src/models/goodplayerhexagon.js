const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GoodPlayerHexagon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });

      this.belongsTo(models.Hexagon, {
        foreignKey: 'hexagonId',
      });
    }
  }
  GoodPlayerHexagon.init({
    playerId: DataTypes.INTEGER,
    hexagonId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'GoodPlayerHexagon',
  });
  return GoodPlayerHexagon;
};
