import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import RouterComp from '@/Router.vue'
import router from './router'
import $ from 'jquery'

Vue.config.productionTip = false

const coins = {
    coins: [],
    tradeableCoins: []
}

if (process.env.NODE_ENV === 'production') {
    Vue.prototype.$backendUrl = "http://iox-backend:8080"
} else {
    Vue.prototype.$backendUrl = "http://localhost:8000"
}


$.ajax({
    url: `${Vue.prototype.$backendUrl}/dashboard/tickers/`,
    type: 'get',
    success: function (data) {
        coins.coins = data
        coins.tradeableCoins = data.filter(word => word.symbol.endsWith("BUSD"))
    }
});

new Vue({
    router,
    vuetify,
    data: {coins},
    render: h => h(RouterComp, {
        props: {
            coins
        }
    })
}).$mount('#app')