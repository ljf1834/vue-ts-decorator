import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((to, from) => {
  NProgress.done();
});


export default router;
