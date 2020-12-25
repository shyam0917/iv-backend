'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tutor_availabilities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tutor_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      day: {
        type: Sequelize.INTEGER
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      },
      book_status: {
        type: Sequelize.ENUM,
        defaultValue: 'available',
        values: ['available', 'unavailable', 'booked']
      },
      isActive: {
        type: Sequelize.ENUM,
        defaultValue: '1',
        values: ['0', '1'] 
      },
      createdAt: { type: Sequelize.DATE, defaultValue: new Date(), },
      updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }

    }, {
      timestamps: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tutor_availabilities');
  }
};
