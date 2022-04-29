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
import {TradingVue, DataCube} from 'trading-vue-js'
import Overlays from 'tvjs-overlays'
import XP from 'tvjs-xp'


//https://github.com/tvjsx/trading-vue-js
//https://github.com/tvjsx/trading-vue-js/tree/master/docs/api#api-book


//https://github.com/tvjsx/tvjs-overlays/tree/master/src/overlays/ALMA
//https://github.com/tvjsx/tvjs-overlays/tree/master/src/overlays/DHistogram
//https://github.com/tvjsx/tvjs-overlays/blob/master/src/overlays/Markers/data.json
//https://github.com/tvjsx/tvjs-overlays/tree/master/src/overlays/TradesPlus

//const histogram = []
//klineData.forEach(value => histogram.push([value[0], value[2] * .95, value[3]]))

//const ddddd = []
//https://github.com/tvjsx/trading-vue-js/blob/master/test/tests/DataHelper.vue
//https://github.com/tvjsx/trading-vue-js/issues/119
//https://github.com/tvjsx/trading-vue-js/tree/master/docs/datacube


//https://github.com/tvjsx/trading-vue-js/issues?q=set+overlay


export default {
  name: 'app',
  components: {TradingVue},
  props: ['coins', 'selected', 'klineData', 'klineMarker'],
  data() {
    return {
      markers: [[]],
      //overlays: [Overlays['Markers']],
      ext: Object.values(XP),
      overlays: Object.values(Overlays),
      dc: new DataCube({
        "chart": {
          "type": "Candles",
          "data": this.klineData
        },
        "onchart": [
          {
            "type": "TradesPlus",
            "name": "TradesPlus",
            "data": [
            ],
            "settings": {
              "markerSize": 8,
              "z-index": 1
            }
          },
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
    klineMarker() {
      this.$refs.tvjs.$set(this.dc.get_one('TradesPlus'), 'data', this.klineMarker)
    },
    klineData(newValue) {
      this.dc.set('chart.data', newValue)
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
</style>
