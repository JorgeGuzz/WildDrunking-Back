const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Player, {
        through: 'PlayerDice',
        foreignKey: 'diceId',
      });
    }
  }
  Dice.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Dice',
  });
  return Dice;
};
