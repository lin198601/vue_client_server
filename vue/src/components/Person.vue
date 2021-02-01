<template>
  <div style="margin:2em;">
    <table v-for="(mes, pos) in cloneArr.filter((el)=> el.visible == true)">
      <tr v-if="pos == 0 && mes.id_person">
        <th width="10%">ФИО</th>
        <th>Долг</th>
      </tr>
      <tr v-else-if="pos == 0 && mes.id_person == 'undefined'">
        <th v-for="(prop, ind) in mes">{{ind}}</th>
      </tr>
      <tr>
         <td :data-id="mes.id_person"> 
          {{mes.fio}}
            <input placeholder="Изменить ФИО" v-bind:id=mes.id_person >
           <input type="submit" value="Изменить"   v-on:click="changePerson(mes.id_person)"/>
          </td>
        
         <td>
           <table v-for="(debt, pos) in mes.debts">
              <tr v-if="pos == 0">
                <th>Сумма(Debt_sum)</th>
                <th>Портфель(Pportfolio_name)</th>
              </tr>
              <tr>
                <td>{{debt.debt_sum}}</td>
                <td>
                  <table v-for="(portfol, pos) in debt.portfolios">
                    <tr v-if="pos == 0">
                        <th>Наименование</th>
                        <th>Дата с</th>
                        <th>Дата по</th>
                      </tr>
                    <tr>
                      <td>{{portfol.pportfolio_name}}</td>
                      <td>{{portfol.sign_date}}</td>
                      <td>{{portfol.end_date}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
           </table>
         </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  data() {
    return{
      cloneArr: new Array(),
    };
  },
  props: new Array('propsMessage'),
})
export default class TableView extends Vue {
  private mounted() {
     this.$data.cloneArr = this.$props.propsMessage;
  }
  private changePerson(data: number) {
    this.$emit('changePerson', data, (document.getElementById(data.toString()) as HTMLInputElement).value);
    (document.getElementById(data.toString()) as HTMLInputElement).value = '';
  }
}
</script>

<style scoped>
table { 
  width: 100%; /* Ширина таблицы */
  border: 1px solid black; /* Рамка вокруг таблицы */
  border-collapse: collapse; /* Отображать только одинарные линии */
}
th{ 
  text-align: left; /* Выравнивание по левому краю */
  background: #ccc; /* Цвет фона ячеек */
  padding: 5px; /* Поля вокруг содержимого ячеек */
  border: 1px solid black; /* Граница вокруг ячеек */
}
td { 
  width:20%;
  padding: 5px; /* Поля вокруг содержимого ячеек */
  border: 1px solid black; /* Граница вокруг ячеек */
}
</style>
