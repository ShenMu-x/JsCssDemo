import Vue from 'vue';
import App from '@/App';
import store from '@/store';
import router from '@/router';

import '@/static/fontAwesome';
import '@/static/element-ui'

let app = new Vue({
    render: (h) => h(App),
    store,
    router
}).$mount('#app');

