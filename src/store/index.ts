import Vue from 'vue'
import Vuex from 'vuex'

import routeStore from './route-store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route: routeStore
  }
})