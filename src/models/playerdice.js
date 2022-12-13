const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlayerDice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
      this.belongsTo(models.Dice, {
        foreignKey: 'diceId',
      });
    }
  }
  PlayerDice.init({
    playerId: DataTypes.INTEGER,
    diceId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlayerDice',
  });
  return PlayerDice;
};
