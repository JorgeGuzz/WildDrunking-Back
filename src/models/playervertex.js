const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlayerVertex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
      this.belongsTo(models.Vertex, {
        foreignKey: 'vertexId',
      });
    }
  }
  PlayerVertex.init({
    playerId: DataTypes.INTEGER,
    vertexId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlayerVertex',
  });
  return PlayerVertex;
};
