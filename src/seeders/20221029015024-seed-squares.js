/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Squares', [
    {
      tipo: 'Obligatoria',
      name: 'botilleria',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Obligatoria',
      name: 'happyHour',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Neutral',
      name: 'ruletaNeutra',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Neutral',
      name: 'tornado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Neutral',
      name: 'uber',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Neutral',
      name: 'equilibrio',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Mala',
      name: 'zorro',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Mala',
      name: 'ruletaMala',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Mala',
      name: 'borrachito',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Buena',
      name: 'arbol',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Buena',
      name: 'ruletaBuena',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tipo: 'Buena',
      name: 'barraLibre',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('Squares', null, {}),
};
