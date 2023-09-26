'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'rahul',
        email: 'rahul123@gmail.com',
        username: 'rahul@456',
        password_hash: '$2a$08$1LLrlmTyNQHzj8oRqNWnsO/HyUA2dAr6PX4DVfqXGODjhBi2p6z.i',
        createdAt: new Date('2023-09-26 02:26:09'),
        updatedAt: new Date('2023-09-26 02:26:09'),
      },
    ]);
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
