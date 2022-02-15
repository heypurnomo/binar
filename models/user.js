'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.History, {
        foreignKey: {
          name: 'userId'
        },
        onDelete: 'CASCADE',
        as: "History"
      })
      User.hasOne(models.Biodata, {
        foreignKey: {
          name: 'userId',
        },
        onDelete: 'CASCADE',
        as: "Biodata"
      })
    }
  }
  User.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING(25),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user']
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};