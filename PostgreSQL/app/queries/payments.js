const knex = require('../connection');

function getAllPayments() {
    return knex('payment')
    .select('*');
  }
  module.exports = {
    getAllPayments
  };