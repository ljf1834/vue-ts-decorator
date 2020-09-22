import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Storage from './utils/storage';
Vue.use(Storage)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: Storage.get('size') || 'default'});

import Axios from './core/axios';
Vue.use(Axios);


import EventBus from './utils/event-bus';
Vue.use(EventBus)

import Drawer from './utils/drawer';
Vue.use(Drawer);

import Components from './components';
Vue.use(Components);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
