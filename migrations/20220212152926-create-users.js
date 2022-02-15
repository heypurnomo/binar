'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(25),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin', 'user']
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};