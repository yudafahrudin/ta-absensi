'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Super Admin',
          username: 'superadmin',
          email: 'ahmadyudafahrudin@gmail.com',
          schoolclassId: 1,
          password:
            '$2a$10$QEFIsO/TdiRIBknyoLEJnuMNX8LvXDC2sRI/apDxOA0b9rdkxvJ.i', //123456
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
