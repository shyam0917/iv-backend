'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('reviews', {
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
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      tutor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      review: {
        type: Sequelize.STRING(500),
      },
      rating: {
        type: Sequelize.DOUBLE,
      },
      createdAt: { type: Sequelize.DATE, defaultValue: new Date(), },
      updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
    });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('reviews');

  }
};
