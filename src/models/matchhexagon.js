const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MatchHexagon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Match, {
        foreignKey: 'matchId',
      });
      this.belongsTo(models.Hexagon, {
        foreignKey: 'hexagonId',
      });
    }
  }
  MatchHexagon.init({
    matchId: DataTypes.INTEGER,
    hexagonId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MatchHexagon',
  });
  return MatchHexagon;
};
