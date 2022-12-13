/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Admins', [
    {
      email: 'antog@gmail.com',
      password: '$2a$05$D76CEvx1Ncth0M7XghxEWe.iQ8A3xeDeBFlpFzoFBSLys.D9aUBOm',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Admins', null, {}),
};
