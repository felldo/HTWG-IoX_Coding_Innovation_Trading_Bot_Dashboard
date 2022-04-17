<template>
  <v-card>
    <v-tabs
        v-model="tab"
        background-color="bg-dark"
        centered
        dark
        icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Overview
        <v-icon>mdi-bank</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Bot configuration
        <v-icon>mdi-cog</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Trade history
        <v-icon>mdi-chart-line</v-icon>
      </v-tab>
    </v-tabs>


    <v-card class="pl-16 pr-16 align-center pb-10">
      <v-tabs-items v-model="tab">
        <v-tab-item
            :key="1"
            :value="'tab-1'"
        >
          <v-data-table
              hide-default-footer
              :headers="headers"
              :items="tableItems"
          ></v-data-table>
        </v-tab-item>
      </v-tabs-items>
      <v-tabs-items v-model="tab">
        <v-tab-item
            :key="2"
            :value="'tab-2'"
        >

          <v-row class="mt-3">
            <v-col cols="4">
              <v-autocomplete
                  :items="coins.coins"
                  v-model="selectedTradeCoins"
                  solo
                  filled
                  rounded
                  chips
                  multiple
                  clearable
                  label="Choose crypto to trade"
                  item-text="symbol"
                  item-value="symbol"
                  class="coinautocomplete"
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row class="mt-3">
            <v-col cols="6">
              <v-container fluid>
                <v-row align="center">
                  <v-col cols="2">
                    <v-subheader>
                      Interval to trade in
                    </v-subheader>
                  </v-col>
                  <v-col cols="5">
                    <v-select
                        v-model="intervalSelect"
                        :items="intervalItems"
                        item-text="interval"
                        item-value="value"
                        label="Select"
                        persistent-hint
                        return-object
                        single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>

          <v-row class="mt-3">
            <v-col cols="6">
              <v-container fluid>
                <v-row align="center">
                  <v-col cols="2">
                    <v-subheader>
                      Trade Algorithm
                    </v-subheader>
                  </v-col>
                  <v-col cols="5">
                    <v-select
                        v-model="tradeAlgorithmSelect"
                        :items="tradeAlgorithmItems"
                        item-text="name"
                        item-value="value"
                        label="Select"
                        persistent-hint
                        return-object
                        single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>

          <v-row class="mt-3 pl-8">
            <v-col cols="2">
              <v-switch
                  v-model="tradingSwitch"
                  :label="`${tradingSwitch === true ? 'Bot is running' : 'Bot is sleeping'}`"
                  inset
                  color="success"
                  class="custom-red"
              >
              </v-switch>
            </v-col>
          </v-row>

        </v-tab-item>
      </v-tabs-items>
    </v-card>

  </v-card>
</template>

<script>
import $ from "jquery";

export default {
  name: "Tab.vue",
  props: ['coins'],
  data() {
    return {
      intervalSelect: {interval: '1 MINUTE', value: '1m'},
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
      tradeAlgorithmSelect: {name: '1 MINUTE', value: 'BB'},
      tradeAlgorithmItems: [
        {name: 'BollingerBands', value: 'BB'},
        {name: 'Moving Average Convergence and Divergence', value: 'MACD'},
      ],
      selectedTradeCoins: [],
      tab: null,
      tradingSwitch: false,
      headers: [
        {
          text: 'Description',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Value', value: 'value'},
      ],
      tableItems: [
        {
          name: 'Starting balance',
          value: "0",
        },
        {
          name: 'Current balance',
          value: "0",
        },
        {
          name: 'Amount of buys Strategy #1',
          value: "0",
        },
        {
          name: 'Amount of sells Strategy #1',
          value: "0",
        },
        {
          name: 'Amount of buys Strategy #1',
          value: "0",
        },
        {
          name: 'Amount of sells Strategy #2',
          value: "0",
        },
        {
          name: 'Runtime of bot',
          value: "0",
        }
      ],
    }
  },
  watch: {
    tradingSwitch(newSwitchState, oldSwitchState) {
      console.log("WATCH NEW TRADE SWITCH STATE: " + newSwitchState);
      console.log("WATCH OLD TRADE SWITCH STATE: " + oldSwitchState);
      console.log("selectedTraidCoins: " + this.selectedTradeCoins);
      $.ajax({
        url: "http://localhost:8000/dashboard/bot_trading/",
        type: 'POST',
        data: {
          'trading': this.selectedTradeCoins,
          'tradingState': this.tradingSwitch,
          'interval': this.intervalSelect.value,
          'strategy': this.tradeAlgorithmSelect.value
        },
        dataType: 'json',
        success: function (data) {
          console.log("CHANGED TRADING STATE " + data)
        }
      });
    },
    selectedTradeCoins(newCoinsArray, oldCoinsArray) {
      console.log("WATCH NEW TRADE: " + newCoinsArray);
      console.log("WATCH OLD TRADE: " + oldCoinsArray);
      // so now comparing your old to new array you would know if a state got
      // added or removed, and fire subsequent methods accordingly.
    },
  },
  mounted: function () {
    const self = this
    $.ajax({
      url: "http://localhost:8000/dashboard/bot_trading/",
      type: 'get',
      success: function (data) {
        console.log(data)
        self.tradingSwitch = data.trading
      }
    });
    window.setInterval(() => {
      this.updateOverview()
    }, 50000)
  },
  methods: {
    updateOverview() {
      const self = this
      $.ajax({
        url: "http://localhost:8000/dashboard/overview/",
        type: 'get',
        success: function (data) {
          console.log(data)
          self.tableItems[0].value = data.startBalance
          self.tableItems[1].value = data.currentBalance
          self.tableItems[6].value = data.uptime
        }
      });
    },
  }
}
</script>

<style scoped>
</style>