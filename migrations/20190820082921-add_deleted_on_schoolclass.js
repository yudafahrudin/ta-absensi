'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'schoolclasses',
      'deletedAt',
      Sequelize.DATE,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'schoolclasses',
      'deletedAt',
      Sequelize.DATE,
    );
  },
};
