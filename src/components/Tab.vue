<template>
  <v-card>
    <v-tabs
        v-model="tab"
        background-color="bg-dark"
        centered
        dark
        grow
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
          <br>
          <p>Server uptime: {{ serverUpTime }}</p>
        </v-tab-item>
      </v-tabs-items>

      <v-tabs-items v-model="tab">
        <v-tab-item
            :key="2"
            :value="'tab-2'"
        >
          <v-row class="mt-3" align="center" justify="center">
            <v-col cols="6">
              <v-autocomplete
                  :items="coins.tradeableCoins"
                  v-model="selectedTradeCoins"
                  :disabled="botConfigDisabled"
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

          <v-row class="mt-3" align="center" justify="center">
            <v-col cols="6">
              <v-container fluid>
                <v-row align="center">
                  <v-col cols="3">
                    <v-subheader>
                      Interval to trade in
                    </v-subheader>
                  </v-col>
                  <v-col cols="5">
                    <v-select
                        v-model="intervalSelectDefault"
                        :items="intervalItems"
                        item-text="interval"
                        item-value="value"
                        label="Select"
                        :disabled="botConfigDisabled"
                        persistent-hint
                        return-object
                        single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>

          <v-row class="mt-3" align="center" justify="center">
            <v-col cols="6">
              <v-container fluid>
                <v-row align="center">
                  <v-col cols="3">
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
                        :disabled="botConfigDisabled"
                        persistent-hint
                        return-object
                        single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>

          <v-row class="mt-3 pl-8" align="center" justify="center">
            <v-col cols="3">
              <v-switch
                  v-model="tradingSwitch"
                  :label="`${tradingSwitch === true ? 'Bot is running' : 'Bot is sleeping'}`"
                  @change="changeState()"
                  :disabled="botStartSwitchDisabled"
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
import Vue from 'vue'

export default {
  name: "Tab.vue",
  props: ['coins', 'intervalItems'],
  data() {
    return {
      botStartSwitchDisabled: true,
      botConfigDisabled: false,
      intervalSelectDefault: {interval: '1 MINUTE', value: '1m'},
      tradeAlgorithmSelect: {name: '1 MINUTE', value: 'BB'},
      tradeAlgorithmItems: [
        {name: 'BollingerBands', value: 'BB'},
        {name: 'Moving Average Convergence and Divergence (MACD)', value: 'MACD'},
      ],
      selectedTradeCoins: [],
      tab: null,
      tradingSwitch: false,
      headers: [
        {
          text: 'Coin',
          align: 'start',
          sortable: false,
          value: 'SYMBOL',
        },
        {text: 'Current Balance', sortable: false, value: 'MONEY'},
        {text: 'Amount of coins', sortable: false, value: 'QUANTITY'},
        {text: 'Net worth Balance + Coins', sortable: false, value: 'NET'},
      ],
      tableItems: [],
      serverUpTime: 0,
    }
  },
  watch: {
    selectedTradeCoins(newCoinsArray) {
      if (newCoinsArray.length > 0) {
        this.botStartSwitchDisabled = false
        this.botConfigDisabled = false
      } else {
        this.botStartSwitchDisabled = true
      }
    },
  },
  mounted: function () {
    const self = this
    $.ajax({
      url: `${Vue.prototype.$backendUrl}/dashboard/bot_trading/`,
      type: 'get',
      success: function (data) {
        self.tradingSwitch = data.trading
        self.selectedTradeCoins = data.coins

        if (self.tradingSwitch) {
          self.$nextTick(function () {
            self.botConfigDisabled = true
          })
        }

      }
    });
    this.updateOverview()
    window.setInterval(() => {
      this.updateOverview()
    }, 30 * 1000)
  },
  methods: {
    changeState() {
      this.botConfigDisabled = this.tradingSwitch

      $.ajax({
        url: `${Vue.prototype.$backendUrl}/dashboard/bot_trading/`,
        type: 'POST',
        data: {
          'trading': this.selectedTradeCoins,
          'tradingState': this.tradingSwitch,
          'interval': this.intervalSelectDefault.value,
          'strategy': this.tradeAlgorithmSelect.value
        },
        dataType: 'json',
        success: function (data) {
          console.log("CHANGED TRADING STATE " + data)
        }
      });
    },
    updateOverview() {
      const self = this
      $.ajax({
        url: `${Vue.prototype.$backendUrl}/dashboard/overview/`,
        type: 'get',
        success: function (data) {
          self.tableItems = data.wallet
          self.serverUpTime = data.uptime
        }
      });
    },
  }
}
</script>

<style scoped>
</style>