const knex = require('../connection');

function getAllPersons() {
    return knex('person')
    .select('*')
  }
  
  function getUpdatePerson(data) {
    return knex('person')
    .where('id_person', '=', data.id)
    .update({ fio: data.fio })
  }

  module.exports = {
    getAllPersons,
    getUpdatePerson
  };