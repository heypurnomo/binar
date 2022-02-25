'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('biodata', {
      biodataId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false,
      },
      birthDay: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: "users",
          key: "userId"
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('biodata');
  }
};