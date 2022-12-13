const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hexagon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Match, {
        through: 'MatchHexagon',
        foreignKey: 'matchId',
      });

      this.belongsTo(models.Square, {
        through: 'HexagonSquare',
        foreignKey: 'squareId',
      });

      // this.hasMany(models.Vertex, {
      this.belongsToMany(models.Vertex, { // cambio 1
        through: 'HexagonVertex',
        foreignKey: 'hexagonId',
      });
    }
  }
  Hexagon.init({
    position: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Hexagon',
  });
  return Hexagon;
};
