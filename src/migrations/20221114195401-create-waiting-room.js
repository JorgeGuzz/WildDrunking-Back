/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WaitingRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full: {
        type: Sequelize.BOOLEAN,
      },
      jugadores: {
        type: Sequelize.INTEGER,
      },
      user_1: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      user_2: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      user_3: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      user_4: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      avatar1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar4: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('WaitingRooms');
  },
};
