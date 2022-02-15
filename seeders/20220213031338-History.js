'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      fs.readFile('./data/histories.json', 'utf-8', (err, data) => {
        if (err) reject(err)
        else {
          resolve(JSON.parse(data))
        }
      })
    })
    .then( histories => {
      histories.forEach(history => {
        history.lastPlayAt = new Date();
      })
      return queryInterface.bulkInsert('histories', histories, {})
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('histories', null, {});
  }
};
