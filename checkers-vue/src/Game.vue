<template>
  <v-app class="v-app">
    <Header/>
    <v-main>
      <br>
      <br>
      <GameTable :field="field"></GameTable>
      <ControlButtons/>
      <NewGameForm/>
      <div class="mb-15"/>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header';
import GameTable from "@/components/gamefield/GameTable";
import NewGameForm from "@/components/NewGameForm";
import ControlButtons from "@/components/gamefield/ControlButtons";

export default {
  name: 'Game',
  props: {
    field: {
      type: Object
    }
  },
  components: {
    GameTable,
    Header,
    NewGameForm,
    ControlButtons,
  }
};
</script>
<style>
.v-app {
  background: #141414 !important;
}
</style>