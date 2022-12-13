const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VertexVertex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Vertex, {
        foreignKey: 'vertexId',
      });
      this.belongsTo(models.Vertex, {
        foreignKey: 'vecinoId',
      });
    }
  }
  VertexVertex.init({
    vertexId: DataTypes.INTEGER,
    vecinoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'VertexVertex',
  });
  return VertexVertex;
};
