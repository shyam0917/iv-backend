'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tutor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      day: {
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.STRING,
      },
      endTime: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATEONLY
      },
      price: {
        type: Sequelize.FLOAT,
      },
      subjectId: {
        type: Sequelize.INTEGER
      },
      subSubjectId: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.STRING,
      },
      sessionName: {
        type: Sequelize.STRING,
      },
      sessionStatus: {
        type: Sequelize.ENUM,
        defaultValue: 'upcoming',
        values: ['upcoming', 'completed', 'cancelled']
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

    await queryInterface.dropTable('sessions');

  }
};
