/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('PlayerVertices', [
    {
      playerId: 1,
      vertexId: 16,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 2,
      vertexId: 90,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 3,
      vertexId: 101,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      playerId: 4,
      vertexId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('PlayerVertices', null, {}),
};
