'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sortName: {
        type: Sequelize.STRING
      },
      countryName: {
        type: Sequelize.STRING
      },
      phonecode: {
        type: Sequelize.INTEGER
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('countries');
  }
};
