'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Matias Ko',
      email: 'bkko@outlook.kr',
      gender: 'male',
      position: 'frontend enginner',
      age: '31',
      createdAt: '2020-05-24 00:00:00',
      updatedAt: '2020-05-24 00:00:00'
    },{
      name: 'Hasebe Kohei',
      email: 'kohei@test.email',
      gender: 'other',
      position: 'backend enginner',
      age: '30',
      createdAt: '2020-05-24 00:00:00',
      updatedAt: '2020-05-24 00:00:00'
    },{
      name: 'Fukami Kazuma',
      email: 'kazuma@test.email',
      gender: 'female',
      position: 'Planner',
      age: '34',
      createdAt: '2020-05-24 00:00:00',
      updatedAt: '2020-05-24 00:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
    .then(() => {
      return queryInterface.dropAllTable();
    });
  }
};
