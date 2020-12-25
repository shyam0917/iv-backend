'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('user_subjects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      subjectId: {
        type: Sequelize.INTEGER
      },
      subSubjectId: {
        type: Sequelize.INTEGER
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
     await queryInterface.dropTable('user_subjects');
  }
};
