const knex = require('../connection');

function getAllDebts() {
    return knex('debt')
    .select('*');
  }

function getNoPayments() {
  return knex('debt')
  .select('person.fio', 'debt.debt_sum')
    .whereNotExists(function() {
      this.select('*').from('payment').whereRaw('debt.id_debt = payment.debt');
  })
  .leftJoin(
    'person',
    'person.id_person',
    '=',
    'debt.person'
  );
}

  module.exports = {
    getAllDebts,
    getNoPayments
  };