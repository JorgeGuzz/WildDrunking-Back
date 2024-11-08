const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlayerUser extends Model {
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
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  PlayerUser.init({
    playerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlayerUser',
  });
  return PlayerUser;
};
