const Router = require('koa-router');
const queries = require('../queries/portfolios');
const router = new Router({
  prefix: '/api/portfolios'
});  

router.get('/', async (ctx) => {
  try {
    const portfolios = await queries.getAllPortfolios();
    ctx.body = {
      data: portfolios
    };
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;