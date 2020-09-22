import Vue from 'vue'
import Vuex from 'vuex'

import routeStore from './modules/route-store';
import keepAliveViews from './modules/keep-alive-views';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route: routeStore,
    keepAliveViews
  }
})