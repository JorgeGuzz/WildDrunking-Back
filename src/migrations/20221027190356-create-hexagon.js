/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hexagons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      position: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      matchId: {
        type: Sequelize.INTEGER,
        references: { model: 'Matches', key: 'id' },
        onDelete: 'CASCADE',
      },
      squareId: {
        type: Sequelize.INTEGER,
        references: { model: 'Squares', key: 'id' },
        onDelete: 'SET NULL',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hexagons');
  },
};
