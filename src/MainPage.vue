<template>
  <v-app class="v-app">
    <Header/>
    <v-main>
      <br>
      <br>
      <v-autocomplete
          :items="coins.coins"
          solo
          filled
          rounded
          chips
          color="blue-grey lighten-2"
          label="Select a coin"
          item-text="name"
          item-value="name"
      >
        <template v-slot:selection="data">
            {{ data.item.symbol }}
        </template>
        <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title v-html="data.item.symbol"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.symbol"></v-list-item-subtitle>
            </v-list-item-content>
        </template>
      </v-autocomplete>
      <CandleStickChart></CandleStickChart>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
//import app
import CandleStickChart from "@/components/CandleStickChart";


//import GameTable from "@/components/gamefield/GameTable";
//import NewGameForm from "@/components/NewGameForm";
//import ControlButtons from "@/components/gamefield/ControlButtons";

export default {
  name: 'MainPage',
  props: ['coins'],
  components: {
    CandleStickChart,
  //  GameTable,
    Header,
//    NewGameForm,
//    Con
  },
};
</script>
<style>
/*.v-app {
  background: #141414 !important;
}*/
</style>