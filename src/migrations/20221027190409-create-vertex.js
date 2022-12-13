/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vertices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      position: {
        type: Sequelize.STRING,
      },
      matchId: {
        type: Sequelize.INTEGER,
        references: { model: 'Matches', key: 'id' },
        onDelete: 'CASCADE',
      },
      playerId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
        onDelete: 'SET NULL',
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vertices');
  },
};
