/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Matches', [
    {
      turno: 0,
      turno_player: 1,
      player_1: 1,
      player_2: 2,
      player_3: 3,
      player_4: 4,
      current: 1,
      subjugada: 'init',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Matches', null, {}),
};
