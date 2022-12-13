/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Shots', [
    {
      name: 'agua',
      price: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'gatorade',
      price: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'aguardiente',
      price: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'vodKambia',
      price: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'tequilaZorro',
      price: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'pisCoperaste',
      price: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('Shots', null, {}),

};
