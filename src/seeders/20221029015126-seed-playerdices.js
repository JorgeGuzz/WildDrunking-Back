/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('PlayerDices', [
    {
      playerId: 1,
      diceId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 1,
      diceId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 1,
      diceId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 1,
      diceId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      diceId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      diceId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      diceId: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      diceId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      diceId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      diceId: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 4,
      diceId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 4,
      diceId: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('PlayerDices', null, {}),
};
