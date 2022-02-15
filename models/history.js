'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    historyId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    win: {
      type: DataTypes.INTEGER,
      allowNull: false,
      set(value) {
        let firstValue = this.getDataValue('win')
        if (firstValue === undefined) firstValue = 0;
        value += firstValue
        this.setDataValue('win', value)
      }
    },
    draw: {
      type: DataTypes.INTEGER,
      allowNull: false,
      set(value) {
        let firstValue = this.getDataValue('draw')
        if (firstValue === undefined) firstValue = 0;
        value += firstValue
        this.setDataValue('draw', value)
      }
    },
    lose: {
      type: DataTypes.INTEGER,
      allowNull: false,
      set(value) {
        let firstValue = this.getDataValue('lose')
        if (firstValue === undefined) firstValue = 0;
        value += firstValue
        this.setDataValue('lose', value)
      }
    },
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'histories',
    timestamps: true,
    createdAt: false,
    updatedAt: 'lastPlayAt',
    getterMethods: {
      wdl() {
        const value = (this.win + this.draw) / this.lose;
        return value.toFixed(2)
      }
    }
  });
  return History;
};