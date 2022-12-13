const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WaitingRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user1',
        foreignKey: 'user_1',
      });
      this.belongsTo(models.User, {
        as: 'user2',
        foreignKey: 'user_2',
      });
      this.belongsTo(models.User, {
        as: 'user3',
        foreignKey: 'user_3',
      });
      this.belongsTo(models.User, {
        as: 'user4',
        foreignKey: 'user_4',
      });
    }
  }
  WaitingRoom.init({
    full: DataTypes.BOOLEAN,
    jugadores: DataTypes.INTEGER,
    avatar1: DataTypes.STRING,
    avatar2: DataTypes.STRING,
    avatar3: DataTypes.STRING,
    avatar4: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'WaitingRoom',
  });
  return WaitingRoom;
};
