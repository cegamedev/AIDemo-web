/**
 * Created by jiaaobo on 16/11/18.
 */
import Vuex from 'vuex'
import Vue from 'vue';
import authModule from  "../biz/auth/vuex/module";
import createLogger from 'vuex/dist/logger'

//使用vuex
Vue.use(Vuex);

const debug =  Vue.config.debug;

export default new Vuex.Store({
  modules: {
    authModule
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []

})
