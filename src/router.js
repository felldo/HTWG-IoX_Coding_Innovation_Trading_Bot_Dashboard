import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './MainPage.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'App',
        component: MainPage,
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router