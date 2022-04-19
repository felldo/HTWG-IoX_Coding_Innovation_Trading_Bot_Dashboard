<template>
  <v-app class="v-app">
    <Header/>
    <v-main>
      <br>
      <v-row>
        <v-col>
          <v-select
              v-model="chartIntervalDefault"
              :items="intervalItems"
              label="Choose interval"
              item-text="interval"
              item-value="value"
              filled
              rounded
              solo
              class="abovechart"
          ></v-select>
        </v-col>

        <v-col>
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="dateRangeText"
                  label="Select a range"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="dates"
                no-title
                range
                scrollable
                :allowed-dates="allowedDates"
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(dates)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

        </v-col>

        <v-col>
          <v-autocomplete
              :items="coins.coins"
              v-model="selected"
              solo
              filled
              rounded
              chips
              label="Choose crypto"
              item-text="symbol"
              item-value="symbol"
              class="coinautocomplete"
          >
            <template v-slot:selection="data">
              {{ data.item.symbol }}
            </template>
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title v-html="data.item.symbol"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.price +'$'"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <CandleStickChart :coins="coins" :selected="selected"></CandleStickChart>
      <br>
      <br>
      <Tab class="mb-10" :coins="coins" :intervalItems="intervalItems"></Tab>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CandleStickChart from "@/components/CandleStickChart";
import Tab from '@/components/Tab'
//import $ from 'jquery'

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

var monthAgo = new Date();
var ddAgo = String(monthAgo.getDate()).padStart(2, '0');
var mmAgo = String(monthAgo.getMonth()).padStart(2, '0'); //January is 0!
var yyyyAgo = monthAgo.getFullYear();

monthAgo = yyyyAgo + '-' + mmAgo + '-' + ddAgo;

export default {
  name: 'MainPage',
  props: ['coins'],
  components: {
    CandleStickChart,
    Header,
    Tab,
    Footer,
  },
  data() {
    return {
      dates: [monthAgo, today],
      menu: false,
      chartIntervalDefault: {interval: '30 MINUTES', value: '30m'},
      intervalItems: [
        {interval: '1 MINUTE', value: '1m'},
        {interval: '3 MINUTES', value: '3m'},
        {interval: '5 MINUTES', value: '5m'},
        {interval: '15 MINUTES', value: '15m'},
        {interval: '30 MINUTES', value: '30m'},
        {interval: '1 HOUR', value: '1h'},
        {interval: '2 HOURS', value: '2h'},
        {interval: '4 HOURS', value: '4h'},
        {interval: '6 HOURS', value: '6h'},
        {interval: '8 HOURS', value: '8h'},
        {interval: '12 HOURS', value: '12h'},
        {interval: '1 DAY', value: '1d'},
        {interval: '3 DAYS', value: '3h'},
        {interval: '1 WEEK', value: '1w'},
        {interval: '1 MONTH', value: '1M'},
      ],
      selected: [], // this is your v-model. and you watch any change to this.
      klineData: []
    }
  },
  methods: {
    allowedDates: val => val <= today,
  },
  computed: {
    dateRangeText () {
      if(this.dates[0] > this.dates[1]){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dates = this.dates.reverse()
      }
      return this.dates.join(' ~ ')
    },
  },
};
</script>
<style>
.abovechart {
  z-index: 102;
}
</style>