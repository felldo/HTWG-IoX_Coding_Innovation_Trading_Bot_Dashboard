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
            <v-col cols="2"></v-col>
            <v-col cols="6">
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
            <v-col cols="2">
              <v-switch
                  v-model="tradingSwitch"
                  :label="`Switch 2: ${tradingSwitch === true ? 'Bot is running' : 'Bot is sleeping'}`"
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
    tradingSwitch(newSelectedArray, oldSelectedArray) {
      console.log("WATCH NEW TRADE SWITCH STATE: " + newSelectedArray);
      console.log("WATCH OLD TRADE SWITCH STATE: " + oldSelectedArray);
      $.ajax({
        url: "http://localhost:8000/dashboard/bot_trading/",
        type: 'post',
        data: {
          "trading": newSelectedArray
        },
        success: function (data) {
          console.log("CHANGED TRADING STATE " + data)
        }
      });
    },
    selectedTradeCoins(newSelectedArray, oldSelectedArray) {
      console.log("WATCH NEW TRADE: " + newSelectedArray);
      console.log("WATCH OLD TRADE: " + oldSelectedArray);
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
    }, 5000)
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