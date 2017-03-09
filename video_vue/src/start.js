'use strict'

import config from  "config";
import  RouterConfig from  "./common/router";
import Vue from 'vue';
import App from './App';


const app  = new Vue({
  router: RouterConfig.router,
  render: h => h(App)
}).$mount('#app');
