'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedules = sequelize.define(
    'schedules',
    {
      subjectId: {
        type: DataTypes.INTEGER(11),
        references: {
          model: 'subjects',
          key: 'id',
        },
      },
      schoolclassId: {
        type: DataTypes.INTEGER(11),
        references: {
          model: 'schoolclass',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER(11),
        references: {
          model: 'users',
          key: 'id',
        },
      },
      startAt: {
        type: DataTypes.DATE,
      },
      finishAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {},
  );
  schedules.associate = function(models) {
    schedules.belongsTo(models.users, {
      foreignKey: 'userId',
    });
    schedules.belongsTo(models.schoolclass, {
      foreignKey: 'schoolclassId',
    });
    schedules.belongsTo(models.subjects, {
      foreignKey: 'subjectId',
    });
  };
  return schedules;
};
