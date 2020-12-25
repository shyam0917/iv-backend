'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subjects', [{
      id : 1,
      subjectName: 'Science',
      parent_subjectId: 0,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, {
      id: 2,
      subjectName: 'Physics',
      parent_subjectId: 1,
      isActive: '1',
      createdAt: new Date(),
      updatedAt: new Date() 
    }, {
      id : 3,
      subjectName: 'Chemistry',
      parent_subjectId: 1,
      createdAt: new Date(),
      updatedAt: new Date() 
    },
    {
      id: 4,
      subjectName: 'Maths',
      parent_subjectId: 0,
      isActive: '1',
      createdAt: new Date(),
      updatedAt: new Date() 
    }, {
      id : 5,
      subjectName: 'Trignometry',
      parent_subjectId: 4,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, {
      id : 6,
      subjectName: 'Probability',
      parent_subjectId: 4,
      createdAt: new Date(),
      updatedAt: new Date() 
    }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subjects', null, {});

  }
};

