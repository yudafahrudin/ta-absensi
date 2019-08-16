'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      type: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'username tidak boleh kosong',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      unique_number: DataTypes.STRING,
      password: DataTypes.STRING,
      schoolclassId: {
        type: DataTypes.INTEGER(11),
        references: {
          model: 'schoolclass',
          key: 'id',
        },
      },
    },
    {},
  );
  users.associate = function(models) {
    users.belongsTo(models.schoolclass, {
      foreignKey: 'schoolclassId',
    });
  };
  return users;
};
