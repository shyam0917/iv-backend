'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('student_payments', {
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
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      }, 
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        foreignKey: true,
      },
      transaction_Id: {
        type: Sequelize.STRING
      },
      paymentStatus: {
        type: Sequelize.ENUM,
        defaultValue: 'paid',
        values: ['paid', 'pending']
      },
      createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
      updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
    }, { timestamps: true });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('student_payment');
  }
};
