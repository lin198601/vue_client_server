<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PKBView msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PKBView from '@/components/PKBView.vue'; // @ is an alias to /src

@Component({
  components: {
    PKBView,
  },
})
export default class Home extends Vue {}
</script>
