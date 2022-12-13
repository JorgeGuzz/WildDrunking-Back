/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      numero: {
        type: Sequelize.INTEGER,
      },
      pina: {
        type: Sequelize.INTEGER,
      },
      naranja: {
        type: Sequelize.INTEGER,
      },
      limon: {
        type: Sequelize.INTEGER,
      },
      frutilla: {
        type: Sequelize.INTEGER,
      },
      personaje: {
        type: Sequelize.STRING,
      },
      nivel_alcohol: {
        type: Sequelize.FLOAT,
      },
      best_in_show: {
        type: Sequelize.BOOLEAN,
      },
      daiquiri_frutilla: {
        type: Sequelize.BOOLEAN,
      },
      margarita_frutilla: {
        type: Sequelize.BOOLEAN,
      },
      tequila_sunrise: {
        type: Sequelize.BOOLEAN,
      },
      pina_colada: {
        type: Sequelize.BOOLEAN,
      },
      primavera: {
        type: Sequelize.BOOLEAN,
      },
      pina_caipirina: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      shot_1: {
        type: Sequelize.INTEGER,
        references: { model: 'Shots', key: 'id' },
        onDelete: 'SET NULL',
        defaultValue: null,
      },
      shot_2: {
        type: Sequelize.INTEGER,
        references: { model: 'Shots', key: 'id' },
        onDelete: 'SET NULL',
        defaultValue: null,
      },
      shot_3: {
        type: Sequelize.INTEGER,
        references: { model: 'Shots', key: 'id' },
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
    await queryInterface.dropTable('Players');
  },
};
