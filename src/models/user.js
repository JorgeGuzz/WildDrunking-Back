const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* this.hasMany(models.Match, {
        through: 'UserMatches',
        foreignKey: 'userId',
        as: 'Matches',
      }); */

      this.hasMany(models.Player, {
        foreignKey: 'userId',
      });

      this.hasMany(models.Session, {
        foreignKey: 'userId',
      });

      this.hasOne(models.WaitingRoom, {
        foreignKey: 'user_1',
        as: 'user1',
      });
      this.hasOne(models.WaitingRoom, {
        foreignKey: 'user_2',
        as: 'user2',
      });
      this.hasOne(models.WaitingRoom, {
        foreignKey: 'user_3',
        as: 'user3',
      });
      this.hasOne(models.WaitingRoom, {
        foreignKey: 'user_4',
        as: 'user4',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
