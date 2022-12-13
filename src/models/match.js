const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* // USERS:
      this.hasMany(models.User, {
        through: 'UserMatches',
        foreignKey: 'matchId',
        as: 'Users',
      }); */

      // PLAYERS:
      this.belongsTo(models.Player, {
        as: 'player1',
        foreignKey: 'player_1',
      });
      this.belongsTo(models.Player, {
        as: 'player2',
        foreignKey: 'player_2',
      });
      this.belongsTo(models.Player, {
        as: 'player3',
        foreignKey: 'player_3',
      });
      this.belongsTo(models.Player, {
        as: 'player4',
        foreignKey: 'player_4',
      });
      this.belongsTo(models.Player, {
        as: 'currentPlayer',
        foreignKey: 'current',
      });
      this.belongsTo(models.Player, {
        as: 'turnoPlayer',
        foreignKey: 'turno_player',
      });

      this.hasMany(models.Hexagon, {
        foreignKey: 'matchId',
      });
      // this.hasMany(models.Vertex, {
      this.belongsToMany(models.Vertex, { // cambio 3
        through: 'MatchVertex',
        foreignKey: 'vertexId',
      });
      // No se como poner que tiene jugadores ya que los 4 estan escritos de distintas formas
      /* this.belongsToMany(models.Player, { // cambio 14
        through: 'PlayerMatch',
        foreignKey: 'matchId',
        as: 'Players',
      });
      this.hasMany(models.PlayerMatch, {
        foreignKey: 'matchId'
      }) */
    }
  }
  Match.init({
    turno: DataTypes.INTEGER,
    status: DataTypes.STRING,
    turno_player: DataTypes.INTEGER,
    numero_turnos: DataTypes.INTEGER,
    ganador: DataTypes.INTEGER,
    tiempo_jugada: DataTypes.INTEGER,
    subjugada: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};
