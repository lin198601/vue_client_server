const Router = require('koa-router');
const queries = require('../queries/payments');
const router = new Router({
  prefix: '/api/payments'
});  

router.get('/', async (ctx) => {
  try {
    const payments = await queries.getAllPayments();
    ctx.body = {
      data: payments
    };
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;