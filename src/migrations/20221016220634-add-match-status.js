/** @type {import('sequelize-cli').Migration} */
const user = require('../models/user');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Matches', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'finished',
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
