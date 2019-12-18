import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import aboutUs from './views/aboutUs'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/index',
        component: index
    }, {
        path: '/index',
        name: 'index',
        component: index
    },
    {
        path: '/about',
        name: 'about',
        component: aboutUs
    }, ]
})