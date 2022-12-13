/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Dices', [
    {
      name: 'defaultDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'proDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'soberDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'penguinDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'tigerDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'monkeyDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'pandaDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'chickenDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'catDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'dogDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'bunnyDice',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('Dices', null, {}),
};
