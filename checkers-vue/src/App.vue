<template>
  <v-app class="v-app">
    <Header/>
    <v-main>
      <br>
      <br>
      <GameTable :field=field></GameTable>
      <ControlButtons/>

      <NewGameForm/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import GameTable from "@/components/gamefield/GameTable";
import NewGameForm from "@/components/NewGameForm";
import ControlButtons from "@/components/gamefield/ControlButtons";

export default {
  name: 'App',

  components: {
    GameTable,
    Footer,
    Header,
    NewGameForm,
    ControlButtons,
  },
  methods: {
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate();  // Notice we have to use a $ here
      // ...
    }
  },
  data() {
    return {
      field: {
        size: 0,
        fieldStatistic1: 0,
        fieldStatistic2: 0,
        fieldStatistic3: 0,
        fieldStatistic4: 0,
        rows: [[]]
      }
    };
  },
  //props: ['field']
};
</script>
<style>
.v-app {
  background: #141414 !important;
}
</style>
