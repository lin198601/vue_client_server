const knex = require('../connection');

function getAllCalendars() {
    return knex('calendar')
    .select('*');
}
  
module.exports = {
  getAllCalendars
};