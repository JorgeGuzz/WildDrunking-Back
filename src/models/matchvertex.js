const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MatchVertex extends Model {
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
      this.belongsTo(models.Vertex, {
        foreignKey: 'vertexId',
      });
    }
  }
  MatchVertex.init({
    matchId: DataTypes.INTEGER,
    vertexId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MatchVertex',
  });
  return MatchVertex;
};
