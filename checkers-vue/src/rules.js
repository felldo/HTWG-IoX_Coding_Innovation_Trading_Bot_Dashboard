import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import Rules from "@/Rules.vue";

var app = new Vue({
    vuetify,
    render: h => h(Rules),
});
app.$mount('#rules')