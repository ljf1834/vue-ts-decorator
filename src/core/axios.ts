/**
 * @module Axios 配置信息
 */

import axios, { AxiosRequestConfig } from 'axios';
import VueAxios from 'vue-axios';
import Qs from 'qs';
import ElementUI from 'element-ui';
import Vue from 'vue';
import router from '@/router';

export default () => {
  axios.interceptors.request.use((res: AxiosRequestConfig) => {
    /* ------------ 序列化参数 ------------- */
    res.data = res.data || {};
    res.withCredentials = true;
    if (res.method === 'post') { res.data = Qs.stringify(res.data); }
    return res;
  });

  /* ----------------- 返回结果拦截, 如未登录直接跳转到登录页 ----------------- */
  axios.interceptors.response.use(res => {
    if (res.data.code && res.data.code === 401) {
      router.push('/login');
      ElementUI.Message({ type: 'warning', message: res.data.message });
    }
    return res.data;
  }, err => {
    ElementUI.Message({ type: 'error', message: '服务器开小差了~！' });
    return err;
  });

  /* ------------------------- 默认请求格式, 和全局请求地址 ------------------------- */
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

  Vue.use(VueAxios, axios);
}