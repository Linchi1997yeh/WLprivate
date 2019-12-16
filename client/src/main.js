import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import VueResource from 'vue-resource'
import vuescroll from 'vuescroll'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import Ionic from '@ionic/vue';
// import '@ionic/core/css/ionic.bundle.css';

// Vue.use(Ionic);
Vue.use(VueAxios, axios)
Vue.use(vuescroll);
Vue.config.productionTip=false;

// Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
