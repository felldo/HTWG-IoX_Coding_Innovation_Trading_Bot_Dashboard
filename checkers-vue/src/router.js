import Vue from 'vue'
import Router from 'vue-router'
import App from './Game.vue'
import Rules from './Rules.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'App',
            component: App
        },
        {
            path: '/rules',
            name: 'Rules',
            component: Rules
        }
    ]
})