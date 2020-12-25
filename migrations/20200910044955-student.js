'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dob: {
        type: Sequelize.DATEONLY,
      },
      mobileNo: {
        type: Sequelize.BIGINT(15)
      },
      country: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.INTEGER,
      },
      city: {
        type: Sequelize.INTEGER,
      },
      class: {
        type: Sequelize.STRING,
      },
      timeZone: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      nativeLanguage: {
        type: Sequelize.STRING,
      },
      subjects: {
        type: Sequelize.STRING
      },
      documentUpload: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      step: {
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.ENUM,
        defaultValue: '1',
        values: ['0', '1']
      },
      createdAt: { type: Sequelize.DATE, defaultValue: new Date(), },
      updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
    }, { timestamps: true });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('students');

  }
};
