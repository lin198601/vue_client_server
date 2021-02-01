<template>
  <div style="margin:2em;">
    <table v-for="(mes, pos) in cloneArr">
      <tr v-if="pos == 0">
        <th v-for="(prop, ind) in mes">{{ind}}</th>
        <th v-if="mes.cal_date">Portfolio_sum</th>
        <th v-if="mes.cal_date">Efficiency</th>
      </tr>
      <tr v-if="mes.cal_date">
        <td>{{mes.cal_date}}</td>
        <td>{{mes.portfolio_sum}}</td>
        <td>{{mes.efficiency}}</td>
      </tr>
      <tr v-else-if="mes.pportfolio_name">
        <td>{{mes.pportfolio_name}}</td>
        <td>{{mes.sum}}</td>
      </tr>
      <tr v-else>
        <td>{{mes.fio}}</td>
        <td>{{mes.debt_sum}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  data() {
    return {
      cloneArr: new Array(),
    };
  },
  props: new Array('propsMessage'),
})
export default class TableView extends Vue {
  private mounted() {
     this.$data.cloneArr = this.$props.propsMessage;
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
