<template>
  <v-app class="v-app">
      <router-view :field="field"></router-view>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer';
export default {
  name: 'Router',
  props: ['field'],
  components: {
    Footer,
  },
};
</script>
