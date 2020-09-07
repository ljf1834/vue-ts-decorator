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


(() => {
  /* -------------- 离开页面时删除不存在于标签页的keepAlive缓存 --------------- */
  let cache: any = null;
  Vue.mixin({
    beforeRouteLeave(to, from, next) {
      let _this_: any = this;
      let _store_: any = store;
      let routeTabs = _store_.state.route.routeTabs;
      if (!cache && _this_.$vnode && _this_.$vnode.parent && _this_.$vnode.parent.componentInstance && _this_.$vnode.parent.componentInstance.cache) {
        cache = _this_.$vnode.parent.componentInstance.cache;
      }
      if (cache) {
        let keys = Object.keys(cache);
        keys.map((key: string) => {
          let hasCache = routeTabs.some((route: any) => key.includes(route.name));
          if (!hasCache) {
            delete cache[key];
          }
        })
      }
      next();
    }
  })
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
