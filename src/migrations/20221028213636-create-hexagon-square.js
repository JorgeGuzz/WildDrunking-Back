/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HexagonSquares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hexagonId: {
        type: Sequelize.INTEGER,
        references: { model: 'Hexagons', key: 'id' },
        onDelete: 'CASCADE',
      },
      squareId: {
        type: Sequelize.INTEGER,
        references: { model: 'Squares', key: 'id' },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('HexagonSquares');
  },
};
