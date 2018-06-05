// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router';
import axios from 'axios';
import MintUI from 'mint-ui'
import App from './App'

axios.defaults.baseURL = 'http://localhost:80/api/banana/';

Vue.config.productionTip = false;
Vue.use(MintUI);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});