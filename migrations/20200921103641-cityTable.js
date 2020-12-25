'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cityName: {
        type: Sequelize.STRING
      },
      state_id: {
        type: Sequelize.INTEGER
      }
      
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('cities');
  }
};
