'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      lessonReminder: {
        type: Sequelize.ENUM,
        defaultValue: '1',
        values: ['0', '1'] 
      },
      generalReminder: {
        type: Sequelize.ENUM,
        defaultValue: '1',
        values: ['0', '1'] 
      },
      isActive: {
        type: Sequelize.ENUM,
        defaultValue: '0',
        values: ['0', '1'] 
      },
      isVerified: {
				type: Sequelize.ENUM,
				defaultValue: '0',
				values: [ '0', '1' ] 
      },
      isAdminVerified: {
				type: Sequelize.ENUM,
				defaultValue: '0',
				values: [ '0', '1' ] 
			},
      createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
      updatedAt: { type: Sequelize.DATE, defaultValue: new Date()} 
  },{timestamps:true})
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('users');
  }
};
