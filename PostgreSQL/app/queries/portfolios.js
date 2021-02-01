const knex = require('../connection');

function getAllPortfolios() {
    return knex('portfolio')
    .select('*')
  }

  function getPortfolioSum() {
    return knex('portfolio')
    .select('debt.debt_sum', 'portfolio.sign_date', 'portfolio.end_date', 'portfolio.pportfolio_name')
    .leftJoin(
      'debt',
      'debt.portfolio',
      '=',
      'portfolio.portfolioid'
    )
  }

  function getPortfolioEff() {
    return knex('portfolio')
    .select('portfolio.pportfolio_name').sum('debt.debt_sum')
    .leftJoin(
      'debt',
      'debt.portfolio',
      '=',
      'portfolio.portfolioid'
    )
    .groupBy('portfolio.pportfolio_name')
  }
  
  module.exports = {
    getAllPortfolios,
    getPortfolioSum,
    getPortfolioEff
  };