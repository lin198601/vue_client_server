const Router = require('koa-router');
const querCal = require('../queries/calendars');
const querPor = require('../queries/portfolios');
const querPay = require('../queries/payments');
const querDebt = require('../queries/debts');
const router = new Router({
  prefix: '/api/calendars'
});  

router.get('/', async (ctx) => {
  try {
    var me = this;
    me.calendars = await querCal.getAllCalendars();
    me.portfolios = await querPor.getPortfolioSum();
    me.payments = await querPay.getAllPayments();
    me.portfoliosEff = await querPor.getPortfolioEff();
    me.noPayments = await querDebt.getNoPayments();

    me.portfolios.forEach(function(el){
      let fromDate = new Date(el.sign_date);
      fromDate.setDate(el.sign_date.getDate() - (el.sign_date.getDate() - 1))
      let ToDate = new Date(el.end_date);
      let count = (el.end_date.getMonth() - el.sign_date.getMonth()) + 12 * (el.end_date.getFullYear() - el.sign_date.getFullYear()) + 1;
      //console.log(fromDate + "--" + ToDate)
       let next = new Date(el.sign_date);
      //console.log(next);
      for (let index = 1; index < count; index++) {
        next.setMonth(next.getMonth() + 1);
        if (this.calendars.findIndex(x => x.cal_date.getTime() == next.getTime()) != -1) {
          let obj = this.calendars[this.calendars.findIndex(x => x.cal_date.getTime() === next.getTime())]
          if (obj.portfolio_sum) {
            obj.portfolio_sum += el.debt_sum;
          } else {
            Object.defineProperty(obj, 'portfolio_sum', {
              value: el.debt_sum,
              writable:true,
              enumerable: true,
              configurable: true
            });
          }
        }
        }
      }, me);

      me.payments.forEach(function(el) {
        let next = new Date(el.date);
        next.setDate(el.date.getDate() - (el.date.getDate() - 1));
        if (this.calendars.findIndex(x => x.cal_date.getTime() == next.getTime()) != -1) {
          let obj = this.calendars[this.calendars.findIndex(x => x.cal_date.getTime() === next.getTime())]
          if (obj.efficiency) {
            let sum = el.payment_sum / obj.portfolio_sum
            obj.efficiency += sum;
          } else {
            Object.defineProperty(obj, 'efficiency', {
              value: el.payment_sum / obj.portfolio_sum, 
              writable:true, 
              enumerable: true, 
              configurable: true
            });
          }
        }
      }, me);
      ctx.body = {
      caledars: me.calendars,
      portfolios: me.portfoliosEff,
      nopayments: me.noPayments
    };
  } catch (err) {
    console.log(err)
  }
})
module.exports = router;