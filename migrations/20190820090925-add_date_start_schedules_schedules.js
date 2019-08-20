'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('schedules', 'startAt', {
        type: Sequelize.DATE,
      });
      await queryInterface.addColumn('schedules', 'finishAt', {
        type: Sequelize.DATE,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('schedules', 'startAt');
      await queryInterface.removeColumn('schedules', 'finishAt');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
