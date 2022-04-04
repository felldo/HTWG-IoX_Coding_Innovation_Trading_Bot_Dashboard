<template>
  <div>
    <trading-vue class="trading-vue"
                 ref="tvjs"
                 :data="dc"
                 :width="this.width"
                 :height="this.height"
                 :titleTxt="this.titleText"
                 :toolbar="true"
                 :extensions="this.ext"
                 :legend-buttons="[
                    'display',
                    'settings',
                    'up',
                    'down',
                    'add',
                    'remove',
                 ]"
                 :chart-config="{
                    TB_B_STYLE: 'line',
                    TB_BORDER: 1,
                    TB_ICON_BRI: 1.5,
                    DEFAULT_LEN: 100,
                 }"
                 :overlays="overlays"

    />
  </div>

</template>


<script>
import {DataCube, TradingVue} from 'trading-vue-js'
import Overlays from 'tvjs-overlays'
import XP from 'tvjs-xp'
import $ from "jquery";
//import klineData from './data.json'


//https://github.com/tvjsx/trading-vue-js
//https://github.com/tvjsx/trading-vue-js/tree/master/docs/api#api-book


//https://github.com/tvjsx/tvjs-overlays/tree/master/src/overlays/ALMA
//https://github.com/tvjsx/tvjs-overlays/tree/master/src/overlays/DHistogram
//https://github.com/tvjsx/tvjs-overlays/blob/master/src/overlays/Markers/data.json
//https://github.com/tvjsx/tvjs-overlays/tree/master/src/overlays/TradesPlus

//const histogram = []
//klineData.forEach(value => histogram.push([value[0], value[2] * .95, value[3]]))

const ddddd = []
//https://github.com/tvjsx/trading-vue-js/blob/master/test/tests/DataHelper.vue
//https://github.com/tvjsx/trading-vue-js/issues/119
//https://github.com/tvjsx/trading-vue-js/tree/master/docs/datacube
export default {
  name: 'app',
  components: {TradingVue},
  props: ['coins', 'selected'],
  data() {
    return {
      //overlays: [Overlays['Markers']],
      ext: Object.values(XP),
      overlays: Object.values(Overlays),
      dc: new DataCube({
        "chart": {
          "type": "Candles",
          "data": ddddd
        },
        "onchart": [
          {
            "name": "Markers",
            "type": "Markers",
            "settings": {},
            "data": [
              [1648899000000, {"color": "#FF33FF", "sel": false, "$": 46636.9}],
              [1648902600000, {"sel": false, "$": 46754.73, "text": "&"}],
              [1648906200000, {"color": "lightblue", "sel": true, "$": 46876.84, "text": "!!", "textColor": "white"}]
            ]
          },
          {
            "type": "TradesPlus",
            "name": "TradesPlus",
            "data": [
              [
                1648868400000,
                0,
                46716.45,
                "Stop"
              ],
              [
                1648884600000,
                1,
                46755.31,
                "L"
              ],
              [
                1648888200000,
                0,
                46732.58,
                "Exit"
              ]
            ],
            "settings": {
              "z-index": 1
            }
          },
          /*{
            "name": "DHistogram",
            "type": "DHistogram",
            "data": histogram
          }*/
        ]
      }),
      width: window.innerWidth,
      height: window.innerHeight * 0.75,
      titleText: "Trading Bot",
      colors: {
        colorBack: '#fff',
        colorGrid: '#eee',
        colorText: '#333',
      }
    }
  },
  mounted() {
    window.tv = this.$refs.tvjs;
    window.test = this;
  },
  watch: {
    selected(newSelectedArray, oldSelectedArray) {
      console.log("++++++++++++++ WATCH NEW CANDLESTICK: " + newSelectedArray);
      console.log("++++++++++++++ WATCH OLD CANDLESTICK: " + oldSelectedArray);
      let self = this
      $.ajax({
        url: "http://localhost:8000/dashboard/kline/",
        type: 'get',
        data: {
          "name": newSelectedArray
        },
        success: function (data) {
          console.log(data)
          console.log("+++++++++++++++++++++++++++FETCHED KLINE CANDLESTICK")
          self.dc = new DataCube({
            "chart": {
              "type": "Candles",
              "data": data
            },
            "onchart": [
              {
                "name": "Markers",
                "type": "Markers",
                "settings": {},
                "data": [
                  [1648899000000, {"color": "#FF33FF", "sel": false, "$": 46636.9}],
                  [1648902600000, {"sel": false, "$": 46754.73, "text": "&"}],
                  [1648906200000, {
                    "color": "lightblue",
                    "sel": true,
                    "$": 46876.84,
                    "text": "!!",
                    "textColor": "white"
                  }]]
              },
              {
                "type": "TradesPlus",
                "name": "TradesPlus",
                "data": [],
                "settings": {
                  "z-index": 1
                }
              },
            ]
          })

          self.$refs.tvjs.resetChart(true)
        }
      });

    }
  },
  methods: {
    changeWidth() {
      this.width = window.innerWidth
    },
  },
  created() {
    window.addEventListener("resize", this.changeWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.changeWidth);
  },
}

</script>

<style>
.trading-vue {
}
</style>
