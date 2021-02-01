const Koa = require('koa');
var cors = require('koa-cors');
var bodyParser = require('koa-bodyparser');

const personRoutes = require('./app/route/persons');
const debtRoutes = require('./app/route/debts');
const portfolioRoutes = require('./app/route/portfolios');
const calendarRoutes = require('./app/route/calendars');
const paymentRoutes = require('./app/route/payments');

const app = new Koa();
const PORT = process.env.PORT || 8083;

app.use(cors());
app.use(bodyParser());
app.use(personRoutes.routes());
app.use(debtRoutes.routes());
app.use(portfolioRoutes.routes());
app.use(calendarRoutes.routes());
app.use(paymentRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;