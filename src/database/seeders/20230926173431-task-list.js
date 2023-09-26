'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Tasks', [
        {
          id: 1,
          title: 'My First Task',
          description: 'Development',
          userId: 1,
          status: 'inprogress',
          createdAt: new Date('2023-09-26 02:27:57'),
          updatedAt: new Date('2023-09-26 16:37:49'),
        },
        {
          id: 2,
          title: 'My Second Task',
          description: 'Unit Testing',
          userId: 1,
          status: 'open',
          createdAt: new Date('2023-09-26 16:38:18'),
          updatedAt: new Date('2023-09-26 16:38:18'),
        },
        {
          id: 3,
          title: 'My Third Task',
          description: 'Integration Testing',
          userId: 1,
          status: 'open',
          createdAt: new Date('2023-09-26 16:38:31'),
          updatedAt: new Date('2023-09-26 16:38:31'),
        },
        {
          id: 4,
          title: 'My Estimation Task',
          description: 'Estimate Project',
          userId: 1,
          status: 'completed',
          createdAt: new Date('2023-08-26 16:38:31'),
          updatedAt: new Date('2023-08-26 16:38:31'),
        },
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
