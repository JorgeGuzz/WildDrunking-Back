const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlayerMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
      this.belongsTo(models.Match, {
        foreignKey: 'matchId',
      });
    }
  }
  PlayerMatch.init({
    playerId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlayerMatch',
  });
  return PlayerMatch;
};
