import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from './core/axios';
Axios();

import Storage from './utils/storage';
Vue.use(Storage)


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;


Vue.mixin({
  /* -------------- 离开页面时删除不存在于标签页的keepAlive缓存 --------------- */
  beforeRouteLeave(to, from, next) {
    let _this_: any = this;
    let _store_: any = store;
    if (_this_.$vnode && _this_.$vnode.parent && _this_.$vnode.parent.componentInstance && _this_.$vnode.parent.componentInstance.cache) {
      let routeTabs = _store_.state.route.routeTabs;
      let keys = Object.keys(_this_.$vnode.parent.componentInstance.cache);
      keys.map((key: string) => {
        let hasCache = routeTabs.some((route: any) => key.includes(route.name));
        if (!hasCache) {
          let cache = _this_.$vnode.parent.componentInstance.cache;
          delete cache[key];
        }
      })
    }
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
