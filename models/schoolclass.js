'use strict';
module.exports = (sequelize, DataTypes) => {
  const schoolclass = sequelize.define('schoolclass', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  schoolclass.associate = function(models) {
    // associations can be defined here
  };
  return schoolclass;
};