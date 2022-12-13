/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      username: 'Anto148',
      password: '$2a$05$ymF7TQVTsCdgYrYIS3n14.UChVHlAaiP3wrovd3ZniuM/ivo2/ws6',
      email: 'antog@gmail.com',
      avatar: 'Jager',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Supez',
      password: '$2a$05$On9m.4rAxs95rGBETAO9Xeazy8zjBnsWIk0Y5aTpwa5ufcaJ4.OVu',
      email: 'nzam@gmail.com',
      avatar: 'Michilada',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Jorgito',
      password: '$2a$05$T/Or7upkMiZwcwSJo7tSQ.ElWeOBrpUxgplT4UNu5JfJ23g8OJg4y',
      email: 'jguzman@gmail.com',
      avatar: 'Snoop Doggin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'IsaC',
      password: '$2a$05$Xb.doGkRwEeqdclfWMkOSubX6yGw0iRi75VfPWm/OsKBM2kIx.hNW',
      email: 'isa.cheru@gmail.com',
      avatar: 'Bar Bunny',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
