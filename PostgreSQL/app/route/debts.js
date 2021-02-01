const Router = require('koa-router');
const queries = require('../queries/debts');
const router = new Router({
  prefix: '/api/debts'
});  

router.get('/', async (ctx) => {
  try {
    const debt = await queries.getAllDebts();
    ctx.body = {
      data: debt
    };
  } catch (err) {
    console.log(err)
  }
})
module.exports = router;