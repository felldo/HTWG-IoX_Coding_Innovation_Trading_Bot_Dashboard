<template>
  <v-app class="v-app">
      <router-view></router-view>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer';
export default {
  name: 'Router',

  components: {
    Footer,
  },
};
</script>
