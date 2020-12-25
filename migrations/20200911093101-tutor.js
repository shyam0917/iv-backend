'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('tutors', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            dob: {
                type: Sequelize.DATEONLY,
            },
            country:{
                type: Sequelize.INTEGER
              },
            state: {
                type: Sequelize.INTEGER
            },
            city: {
                type: Sequelize.INTEGER
            },
            mobileNo: {
                type: Sequelize.BIGINT(15)
            },
            iyzicoId: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            imageUrl: {
                type: Sequelize.STRING
            },
            nativeLanguage: {
                type: Sequelize.STRING
            },
            otherLanguage: {
                type: Sequelize.STRING
            },
            timeZone: {
                type: Sequelize.STRING
              },
            costperSession: {
                type: Sequelize.INTEGER
            },
            certificates: {
                type: Sequelize.STRING(500)
            },
            awards: {
                type: Sequelize.STRING(500)
            },
            education: {
                type: Sequelize.STRING(500)
            },
            professionalDetails: {
                type: Sequelize.STRING(500)
            },
            documentUpload: {
                type: Sequelize.STRING(500)
            },
            step: {
                type: Sequelize.INTEGER
            },
            isActive: {
                type: Sequelize.ENUM,
                defaultValue: '1',
                values: ['0', '1'] 
              },
            createdAt: { type: Sequelize.DATE, defaultValue: new Date(), },
            updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }

        },{timestamps:true});

    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.dropTable('tutors');

    }
};
