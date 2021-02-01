const Router = require('koa-router');
const queries = require('../queries/persons');
const router = new Router();  

router.get('/api/persons', async (ctx) => {
  try {
    const persons = await queries.getAllPersons();
    ctx.body = {
      data: persons
    };
  } catch (err) {
    console.log(err)
  }
})
router.post('/api/persons', async (ctx) => {
  ctx.body = ctx.request.body;
  const persons = await queries.getUpdatePerson(ctx.body);
  ctx.body = {
    result: persons,
    fio: ctx.body.fio
  };
})

module.exports = router;