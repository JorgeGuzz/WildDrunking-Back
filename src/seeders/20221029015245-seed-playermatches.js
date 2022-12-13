/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('PlayerMatches', [
    {
      playerId: 1,
      matchId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      matchId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      matchId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 4,
      matchId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('PlayerMatches', null, {}),
};
