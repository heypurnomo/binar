'use strict';
const fs = require('fs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let biodata = fs.readFileSync('./data/biodata.json', 'utf-8')
    biodata = JSON.parse(biodata);
    await queryInterface.bulkInsert('biodata',biodata, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('biodata', null, {});
  }
};
