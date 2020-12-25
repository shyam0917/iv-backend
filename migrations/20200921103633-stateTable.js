'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 await queryInterface.createTable('states', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stateName: {
    type: Sequelize.STRING
  },
  country_id: {
    type: Sequelize.INTEGER
  }
});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('states');
  }
};
