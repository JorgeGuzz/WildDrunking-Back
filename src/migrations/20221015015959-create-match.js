/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      turno: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      player_1: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
        onDelete: 'CASCADE',
      },
      player_2: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
        onDelete: 'CASCADE',
      },
      player_3: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
        onDelete: 'CASCADE',
      },
      player_4: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
        onDelete: 'CASCADE',
      },
      current: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
        onDelete: 'CASCADE',
      },
      subjugada: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'init',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  },
};
