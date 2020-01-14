// import Axios from 'axios-observable'
import Rx from 'rxjs/Rx'
import dayjs from 'dayjs'

import Vue from 'vue';
import VueScroll from 'vuescroll'
// import VueAxios from 'vue-axios'
import VueRx from 'vue-rx'
import VueCookies from 'vue-cookies'

import App from './App.vue';
import router from './router';
import ApiService from './services/ApiService.js';
import UserService from './services/UserService.js';

// -- vue global setting --
const BASE_URL = 'http://localhost:3000'
Vue.config.productionTip = false

// -- vue plugins -- 
Vue.use(VueScroll)

Vue.use(VueRx, Rx)

Vue.use(VueCookies)

Vue.use(ApiService, BASE_URL)

// must after api service and vue-cookies
Vue.use(UserService)

Vue.filter('dateformat', (value, format="DD/MM/YYYY") => {
    return dayjs(value).format(format)
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
