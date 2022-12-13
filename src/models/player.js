const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // No se si pertenece a muchos shots
      /* this.belongsToMany(models.Shot, {
        through: 'PlayerShot',
        //foreignKey: 'playerId'
      }); */
      // No se si un personaje pertenece a muchos dados
      this.belongsToMany(models.Dice, {
        through: 'PlayerDice',
        // foreignKey: 'playerId'
      });

      this.belongsTo(models.User, {
        through: 'PlayerUser',
        as: 'current_user_',
        foreignKey: 'userId',
      });

      /* this.hasOne(models.PlayerMatch, {
        foreignKey: 'playerId',
      }); */
      this.hasOne(models.Match, {
        foreignKey: 'player_1',
        as: 'player1',
      });
      this.hasOne(models.Match, {
        foreignKey: 'player_2',
        as: 'player2',
      });
      this.hasOne(models.Match, {
        foreignKey: 'player_3',
        as: 'player3',
      });
      this.hasOne(models.Match, {
        foreignKey: 'player_4',
        as: 'player4',
      });
      this.hasOne(models.Match, {
        as: 'current_match',
        foreignKey: 'current',
      });

      this.belongsTo(models.Shot, {
        foreignKey: 'shot_1',
        as: 'shot1',
      });
      this.belongsTo(models.Shot, {
        foreignKey: 'shot_2',
        as: 'shot2',
      });
      this.belongsTo(models.Shot, {
        foreignKey: 'shot_3',
        as: 'shot3',
      });

      // this.hasMany(models.Dice, {
      this.belongsToMany(models.Dice, { // cambio 10
        through: 'PlayerDice',
        // foreignKey: 'playerId'
      });

      /* this.belongsToMany(models.Shot, { // cambio 11
        through: 'PlayerShot',
        //foreignKey: 'playerId'
      }); */
      this.hasOne(models.Vertex, {
        through: 'PlayerVertex',
        foreignKey: 'playerId',
      });
      this.hasOne(models.PlayerVertex, {
        foreignKey: 'playerId',
      });
    }
  }
  Player.init({
    numero: DataTypes.INTEGER,
    pina: DataTypes.INTEGER,
    naranja: DataTypes.INTEGER,
    limon: DataTypes.INTEGER,
    frutilla: DataTypes.INTEGER,
    personaje: DataTypes.STRING,
    nivel_alcohol: DataTypes.FLOAT,
    best_in_show: DataTypes.BOOLEAN,
    daiquiri_frutilla: DataTypes.BOOLEAN,
    margarita_frutilla: DataTypes.BOOLEAN,
    tequila_sunrise: DataTypes.BOOLEAN,
    pina_colada: DataTypes.BOOLEAN,
    primavera: DataTypes.BOOLEAN,
    pina_caipirina: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
