'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female', 'other'),
    position: DataTypes.STRING,
    age: DataTypes.STRING
  }, {});
  
  Users.associate = function(models) {
    Users.hasMany(models.Reviews, {foreignKey: 'reviewee_id'});
    Users.hasMany(models.Reviews, {foreignKey: 'reviewer_id'});
  };
  return Users;
};