'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('session_bookings',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        session_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
        },
        startTime: {
          type: Sequelize.STRING,
        },
        endTime: {
          type: Sequelize.STRING,
        },
        date: {
          type: Sequelize.DATE
        },
        day: {
          type: Sequelize.FLOAT,
        },
        bookingStatus: {
          type: Sequelize.STRING,
          defaultValue: 'booked'
        },
        isActive: {
          type: Sequelize.ENUM,
          defaultValue: '0',
          values: ['0', '1']
        },
        createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
        updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
      }, { timestamps: true });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('session_bookings');
  }
};
