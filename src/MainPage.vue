<template>
  <v-app class="v-app">
    <Header/>
    <v-main>
      <br>
      <v-row align="center" class="ml-5 mr-5 abovechart">
        <v-col cols="2">
          <v-select
              v-model="chartIntervalDefault"
              :items="intervalItems"
              label="Choose interval"
              item-text="interval"
              item-value="value"
          ></v-select>
        </v-col>

        <v-col cols="2">
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

        <v-col cols="2">
          <v-autocomplete
              :items="coins.coins"
              v-model="selectedCoin"
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

        <v-col align="left">
          <v-btn
              color="primary"
              elevation="2"
              v-on:click="updateChart"
              :loading="updateChartLoading"
              :disabled="updateChartLoading"
          >Update chart
          </v-btn>
        </v-col>
      </v-row>
      <CandleStickChart :klineData="klineData"></CandleStickChart>
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
import $ from "jquery";
import iziToast from 'izitoast'
//import $ from 'jquery'

var today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

var monthAgo = new Date();
const ddAgo = String(monthAgo.getDate()).padStart(2, '0');
const mmAgo = String(monthAgo.getMonth()).padStart(2, '0'); //January is 0!
const yyyyAgo = monthAgo.getFullYear();

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
      selectedCoin: [], //coin der für das candlestickchart ausgewählt wird
      klineData: [],
      updateChartLoading: false,
    }
  },
  methods: {
    allowedDates: val => val <= today,
    updateChart() {
      //fetch data for candlestickchart
      const self = this;
      if (this.selectedCoin == "") {
        iziToast.error({
          title: 'Selected Coin is empty',
          message: "Please select a coin"
        });
        return;
      }
      if (self.dates.length != 2) {
        iziToast.error({
          title: 'Date is not a range',
          message: "Please select a date range"
        });
        return;
      }

      this.updateChartLoading = true

      const nextDay = new Date()
      nextDay.setDate(new Date(self.dates[1]).getDate() + 1)

      let calcInterval = ""
      if (typeof this.chartIntervalDefault === 'string' || this.chartIntervalDefault instanceof String) {
        calcInterval = this.chartIntervalDefault
      } else {
        calcInterval = this.chartIntervalDefault.value
      }

      $.ajax({
        url: "http://localhost:8000/dashboard/kline/",
        type: 'get',
        data: {
          "symbol": self.selectedCoin,
          "interval": calcInterval,
          "startDate": new Date(self.dates[0]).getTime(),
          "endDate": self.dates[1] === today ? new Date().getTime() : nextDay.getTime()
        },
        success: function (data) {
          self.klineData = data
          self.updateChartLoading = false
        },
        error: function(){
          self.updateChartLoading = false
        }
      });
    }
  },
  computed: {
    dateRangeText() {
      if (this.dates[0] > this.dates[1]) {
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