'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      fs.readFile('./data/users.json', 'utf-8', (err, data) => {
        if (err) reject(err)
        else {
          data = JSON.parse(data)
          resolve(data)
        }
      })
    })
    .then(users => {
      return queryInterface.bulkInsert('users', users, {})
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
