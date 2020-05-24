'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    reviewer_id: DataTypes.INTEGER,
    reviewee_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  
  Reviews.associate = function(models) {
    Reviews.belongsTo(models.Users, {as: 'reviewee', foreignKey: 'reviewee_id'});
    Reviews.belongsTo(models.Users, {as: 'reviewer', foreignKey: 'reviewer_id'});
  };
  return Reviews;
};