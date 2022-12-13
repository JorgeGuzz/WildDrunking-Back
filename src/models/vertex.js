const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vertex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Hexagon, {
      this.belongsToMany(models.Hexagon, { // cambio 13
        through: 'HexagonVertex',
        foreignKey: 'vertexId',
      });

      // agregado 30/10 20:21 no estoy segura si está bien:
      this.belongsTo(models.Player, {
        through: 'PlayerVertex',
        // foreignKey: 'vertexId',
        as: 'player',
      });

      this.belongsTo(models.Match, {
        foreignKey: 'matchId',
      });

      this.hasMany(models.VertexVertex, {
        foreignKey: 'vertexId',
        as: 'vertices',
      });
      this.hasMany(models.VertexVertex, {
        foreignKey: 'vecinoId',
        as: 'vecinos',
      });
    }
  }
  Vertex.init({
    position: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Vertex',
  });
  return Vertex;
};
