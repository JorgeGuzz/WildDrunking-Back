const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HexagonSquare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Hexagon, {
        foreignKey: 'hexagonId',
      });
      this.belongsTo(models.Square, {
        foreignKey: 'squareId',
      });
    }
  }
  HexagonSquare.init({
    hexagonId: DataTypes.INTEGER,
    squareId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'HexagonSquare',
  });
  return HexagonSquare;
};
