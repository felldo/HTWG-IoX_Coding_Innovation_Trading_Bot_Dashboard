<template>
  <v-app class="v-app">
    <router-view :field="field"></router-view>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer';
import MainJs from "@/main";

export default {
  name: 'Router',
  props: ['field'],
  components: {
    Footer,
  },
  watch: {
    $route(to, from) {
      //this.show = false;
      if (to.path == "/") {
        MainJs.documentReady()
        this.$nextTick(function () {
          console.log("NEXT TICK")
          console.log(from)
        })
      }
    }
  }
};
</script>
