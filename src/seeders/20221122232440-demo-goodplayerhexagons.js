/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('GoodPlayerHexagons', [
    {
      playerId: 1,
      hexagonId: 51,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 1,
      hexagonId: 52,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 1,
      hexagonId: 59,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      playerId: 2,
      hexagonId: 56,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      hexagonId: 63,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      hexagonId: 64,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      playerId: 3,
      hexagonId: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      hexagonId: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      hexagonId: 19,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      playerId: 4,
      hexagonId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 4,
      hexagonId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 4,
      hexagonId: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
