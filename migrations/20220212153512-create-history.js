'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('histories', {
      historyId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      win: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      draw: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lose: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: "users",
          key: "userId"
        }
      },
      lastPlayAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('histories');
  }
};