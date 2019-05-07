import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import Message from './libs/alertMessage.js';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$axios = axios;
Vue.prototype.$Message = Message;
Vue.config.productionTip = false;

// 默认8秒后超时
axios.defaults.timeout = 8000;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
