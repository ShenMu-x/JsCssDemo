import Vue from 'vue';
import App from '@/app';
import Router from '@/router/index.js'
import store from './store/index'


new Vue({
    router: Router,
    store,
    render: h => h(App),
}).$mount('#app');

(function () {
    window.onbeforeunload = function () {
        // window.localStorage.setItem('hey', 'beforeUnload')
        window.localStorage.setItem('task', JSON.stringify(store.state.task));
    };
    window.onunload = function () {
        // window.localStorage.setItem('hey', 'Unload')
        window.localStorage.setItem('task', JSON.stringify(store.state.task));
    }
})()
