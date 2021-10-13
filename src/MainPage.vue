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
      <template>
        <v-card
            class="mx-auto text-center"
            color="green"
            dark
            max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                  :value="value"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
              >
                <template v-slot:label="item">
                  ${{ item.value }}
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h4 font-weight-thin">
              Sales Last 24h
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn
                block
                text
            >
              Go to Report
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header';
//import GameTable from "@/components/gamefield/GameTable";
//import NewGameForm from "@/components/NewGameForm";
//import ControlButtons from "@/components/gamefield/ControlButtons";

export default {
  name: 'MainPage',
  props: ['coins'],
  data: () => ({
    value: [
      423,
      446,
      675,
      510,
      590,
      610,
      760,
    ],
  }),
  components: {
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