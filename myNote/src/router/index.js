import Vue from 'vue'
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/Home',
            component: resolve => require(['@/views/Home.vue'], resolve),
            meta: {

            },
            name: 'Home'
        },
        {
            path: '/',
            component: resolve => require(['@/views/Home.vue'], resolve),
            meta: {

            },
            name: 'Home'
        },
        {
            path: '/Detail/:name',
            component: resolve => require(['@/views/Detail.vue'], resolve),
            meta: {

            },
            name: 'Detail'
        },
        {
            path: '/About',
            component: resolve => require(['@/views/About.vue'], resolve),
            meta: {

            },
            name: 'About'
        },
    ]
})