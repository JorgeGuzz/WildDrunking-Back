/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('PlayerUsers', [
    {
      playerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 4,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('PlayerUsers', null, {}),
};
