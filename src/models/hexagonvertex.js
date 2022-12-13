const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HexagonVertex extends Model {
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
      this.belongsTo(models.Vertex, {
        foreignKey: 'vertexId',
      });
    }
  }
  HexagonVertex.init({
    hexagonId: DataTypes.INTEGER,
    vertexId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'HexagonVertex',
  });
  return HexagonVertex;
};
