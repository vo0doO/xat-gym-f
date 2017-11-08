// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';


//import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-vue/dist/bootstrap-vue.css';

//import '../public/css/bootstrap.min.css';

import '../public/css/loader.css';
import '../public/css/sidebar.css';

//import '../public/js/bootstrap.bundle.min.js';

import settings from './settings.json';

//Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

axios.defaults.baseURL = settings.BackURL + ':3000/api/';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    backendUrl: settings.BackURL + ':3000/'
  },
  mounted() {},
  router,
  template: '<App/>',
  components: {
    App
  }
});
