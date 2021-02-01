<template>
  <div class="hello">
     <div>
        <p>1.	Выбрать должников с суммой к взысканию (сумма всех долгов должника) более 150 рублей</p>
        <p style="float:left;line-height:0;width:300px;">Поиск должников по сумме</p>
        <input v-model="recoveryAmount" style="float:left;">
      </div>
      <div v-if="load" align="center">
        <div v-for="item in personArr">
          <Person :propsMessage="item" v-on:changePerson="changePerson"/>
        </div>
        <div v-for="item in statisData">
          <div v-if="item[0].cal_date">
            <p>2.	На каждый месяц посчитать портфель в работе.Портфель в работе – сумма долгов, которые находились в работе хотя бы один день в месяце</p> 
            <p>4.	Посчитать эффективность в каждый месяц (сумма всех платежей за месяц/портфель в работе за месяц)</p>
          </div> 
          <div v-else-if="item[0].pportfolio_name">
            <p>3.	Посчитать эффективность по каждому портфелю (сумма всех платежей/сумма всех долгов)</p> 
          </div> 
          <div v-else>
            <p>5.	Выбрать все долги без платежей</p> 
          </div> 
          <Statistic :propsMessage="item" />
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import Person from '@/components/Person.vue';
import Statistic from '@/components/Statistic.vue';

@Component({
  data() {
    return {
      _recoveryAmount: '',
      isload: false,
      objPerson: new Array(),
      statisData: new Array(),
    };
  },
  components: {
    Person,
    Statistic,
  },
})
export default class HelloWorld extends Vue {
  private action: string[] = ['persons', 'debts', 'portfolios', 'calendars'];
  private holder: string[] = new Array();
  private async mounted() {
    for (const iterator of this.action) {
      if (this.action.indexOf(iterator) !== -1) {
        await axios.get(`http://localhost:8083/api/${iterator}`)
        .then((res) => {
          if (iterator === 'persons') {
            res.data.data.forEach((element: object) => {
              Object.defineProperty(element, 'visible',
                { value: true, writable: true, enumerable: true, configurable: true });
            });
            this.$data.objPerson[this.action.indexOf(iterator)] = res.data.data;
          } else if (iterator === 'debts') {
            this.holder = res.data.data;
          } else if (iterator === 'portfolios') {
            this.holder.forEach((item: any, ind: number) => {
               Object.defineProperty(item, 'portfolios', {
                value: res.data.data.filter((portf: any) => portf.portfolioid === item.portfolio),
                writable: true,
                enumerable: true,
                configurable: true,
              });
            }, this.holder);
            this.$data.objPerson[this.action.indexOf('persons')].forEach((item: any, ind: number) => {
               Object.defineProperty(item, 'debts', {
                  value: this.holder.filter((debt: any) => debt.person === item.id_person),
                  writable: true,
                  enumerable: true,
                  configurable: true,
                });
            }, this.$data.objPerson[this.action.indexOf('persons')]);
          } else {
            this.$data.statisData = res.data;
          }
        })
        .catch((ex) => { throw new Error(ex); });
      }
    }
    this.$data.isload = true;
  }
  private changePerson(data: number, personFIO: string) {
    axios.post(`http://localhost:8083/api/persons`,
      {
        id: data,
        fio: personFIO,
      })
      .then((response) => {
        if (response.data.result > 0) {
          const index = this.$data.objPerson[0].findIndex( (x: any) => x.id_person === response.data.result);
          if (index !== -1) {
            this.$data.objPerson[0][index].fio = response.data.fio;
          }
        }
      })
      .catch((e) => { throw new Error(e); });
  }
  public get load() {
    if (this.$data.objPerson[0]) {
      this.$data.isload = true;
    } else {
      this.$data.isload = false;
    }
    return this.$data.isload;
  }

  set recoveryAmount(value) {
    if (!isNaN(value)) {
      this.$data._recoveryAmount = value;
      this.$data.isload = false;
    }
  }
  get recoveryAmount(): number {
    if (this.$data.objPerson[0] && !isNaN(this.$data._recoveryAmount)) {
      this.$data.objPerson[this.action.indexOf('persons')].forEach((pers: any) => {
        let amount: number = 0;
        if (this.$data._recoveryAmount) {
          this.holder.forEach((debt: any) => {
            if (pers.id_person === debt.person) {
              amount += debt.debt_sum;
            }
          });
          pers.visible = this.$data._recoveryAmount < amount;
        } else {
          pers.visible = true;
        }
      });
    }
    return this.$data._recoveryAmount;
  }
  get personArr() {
    return this.$data.objPerson;
  }
    get statData() {
    return this.$data.statisData;
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
